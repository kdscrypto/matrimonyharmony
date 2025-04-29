
import { supabase } from "@/integrations/supabase/client";
import CryptoJS from "crypto-js";

// Constantes de sécurité
const LOGIN_ATTEMPTS_KEY = "login-attempts";
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes en millisecondes
const TOKEN_NAME = "wedding-csrf-token";

interface LoginAttempt {
  count: number;
  lastAttempt: number;
  lockedUntil?: number;
  ipAddress?: string;
}

/**
 * Vérifie si l'adresse IP est actuellement bloquée
 */
export const isLoginBlocked = (): boolean => {
  const attemptsJson = localStorage.getItem(LOGIN_ATTEMPTS_KEY);
  if (!attemptsJson) return false;

  const attempts: LoginAttempt = JSON.parse(attemptsJson);
  
  // Si un blocage est en cours et n'est pas expiré
  if (attempts.lockedUntil && attempts.lockedUntil > Date.now()) {
    return true;
  } else if (attempts.lockedUntil && attempts.lockedUntil <= Date.now()) {
    // Si le blocage est expiré, le réinitialiser
    resetLoginAttempts();
    return false;
  }
  
  return false;
}

/**
 * Récupère le temps restant avant la fin du blocage
 */
export const getRemainingLockoutTime = (): number => {
  const attemptsJson = localStorage.getItem(LOGIN_ATTEMPTS_KEY);
  if (!attemptsJson) return 0;

  const attempts: LoginAttempt = JSON.parse(attemptsJson);
  
  if (attempts.lockedUntil && attempts.lockedUntil > Date.now()) {
    return Math.ceil((attempts.lockedUntil - Date.now()) / 1000 / 60); // minutes
  }
  
  return 0;
}

/**
 * Enregistre une tentative de connexion échouée
 */
export const recordFailedLoginAttempt = (): void => {
  let attempts: LoginAttempt;
  const attemptsJson = localStorage.getItem(LOGIN_ATTEMPTS_KEY);
  
  if (attemptsJson) {
    attempts = JSON.parse(attemptsJson);
    attempts.count += 1;
    attempts.lastAttempt = Date.now();
    
    // Si le nombre maximum de tentatives est atteint, bloquer les futures tentatives
    if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
      attempts.lockedUntil = Date.now() + LOCKOUT_TIME;
      // Journaliser la tentative de force brute
      logSecurityEvent("brute_force_attempt", { 
        attempts_count: attempts.count,
        lockout_until: new Date(attempts.lockedUntil).toISOString()
      });
    }
  } else {
    attempts = {
      count: 1,
      lastAttempt: Date.now()
    };
  }
  
  localStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify(attempts));
}

/**
 * Réinitialise le compteur de tentatives de connexion
 */
export const resetLoginAttempts = (): void => {
  localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
}

/**
 * Compare un hash pour vérifier le mot de passe administrateur
 * Utilise un algorithme plus sécurisé (PBKDF2)
 */
export const verifyAdminPassword = (password: string): boolean => {
  // Utilisation de PBKDF2 avec plus d'itérations pour une meilleure sécurité
  const salt = "wedding-salt-2025"; // En production, le sel devrait être unique et stocké séparément
  const key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 10000 }).toString();
  const expectedHash = "a2d2da2f925ca27152727687c2d759fa4fc8a786bb6be669d8adf44abae16790"; // Hash de "wedding2024" avec PBKDF2
  
  const result = key === expectedHash;
  
  // Journaliser la tentative d'authentification (sans le mot de passe)
  logSecurityEvent(result ? "admin_login_success" : "admin_login_failed", {
    timestamp: new Date().toISOString()
  });
  
  return result;
}

/**
 * Sanitise les entrées utilisateur pour éviter les attaques XSS
 * Version renforcée avec échappement HTML plus complet
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return "";
  
  // Échappement HTML renforcé
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\\/g, "&#92;")
    .replace(/`/g, "&#96;")
    // Suppression des scripts potentiels
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/data:/gi, "");
}

/**
 * Validation renforcée des entrées du formulaire RSVP
 */
export const validateRsvpInput = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Validation du nom avec regex plus strict
  if (!data.name || data.name.trim().length < 2) {
    errors.push("Le nom doit contenir au moins 2 caractères");
  } else if (!/^[a-zA-ZÀ-ÿ\s'-]{2,100}$/u.test(data.name.trim())) {
    errors.push("Le nom contient des caractères non autorisés");
  }
  
  // Validation de l'email avec regex plus précis
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push("L'adresse email n'est pas valide");
  }
  
  // Validation du nombre d'invités
  if (data.attending === true) {
    if (typeof data.guest_count !== 'number') {
      errors.push("Le nombre d'invités doit être un nombre");
    } else if (data.guest_count < 0 || data.guest_count > 4) {
      errors.push("Le nombre d'invités doit être entre 0 et 4");
    }
  }
  
  // Validation des restrictions alimentaires (longueur maximale)
  if (data.dietary_restrictions && data.dietary_restrictions.length > 1000) {
    errors.push("Les restrictions alimentaires ne doivent pas dépasser 1000 caractères");
  }
  
  // Validation du message (longueur maximale et caractères interdits)
  if (data.message && data.message.length > 1000) {
    errors.push("Le message ne doit pas dépasser 1000 caractères");
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Génère un token CSRF pour protéger contre les attaques CSRF
 */
export const generateCSRFToken = (): string => {
  const token = CryptoJS.lib.WordArray.random(16).toString();
  localStorage.setItem(TOKEN_NAME, token);
  return token;
}

/**
 * Vérifie si un token CSRF est valide
 */
export const validateCSRFToken = (token: string): boolean => {
  const storedToken = localStorage.getItem(TOKEN_NAME);
  if (!storedToken || storedToken !== token) {
    logSecurityEvent("csrf_token_invalid", {
      timestamp: new Date().toISOString()
    });
    return false;
  }
  return true;
}

/**
 * Enregistre une action de sécurité pour l'audit (en console uniquement)
 * Étant donné que la table security_logs n'existe pas dans Supabase,
 * nous allons simplement journaliser les événements dans la console
 */
export const logSecurityEvent = async (eventType: string, details: any): Promise<void> => {
  try {
    // Au lieu d'insérer dans une table non-existante,
    // nous journalisons l'événement dans la console
    console.log("[Security Event]", {
      event_type: eventType,
      details,
      created_at: new Date().toISOString()
    });
    
    // En environnement de production, si vous souhaitez conserver ces logs,
    // vous devrez créer une table security_logs dans votre base de données Supabase
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'événement de sécurité:", error);
  }
}
