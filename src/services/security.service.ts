
import { supabase } from "@/integrations/supabase/client";
import CryptoJS from "crypto-js";

// Constantes de sécurité
const LOGIN_ATTEMPTS_KEY = "login-attempts";
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes en millisecondes

interface LoginAttempt {
  count: number;
  lastAttempt: number;
  lockedUntil?: number;
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
 */
export const verifyAdminPassword = (password: string): boolean => {
  // Utilisation d'un algorithme de hachage sécurisé avec un sel fixe
  // En production, il serait préférable de stocker le hash dans une base de données sécurisée
  const passwordHash = CryptoJS.SHA256(password + "wedding-salt-2025").toString();
  const expectedHash = "a18fc8475920825d5cdcd12649ecfd2cfa3751a1447ceab88c3f854ea99ca9b7"; // Hash de "wedding2024" + sel
  
  return passwordHash === expectedHash;
}

/**
 * Sanitise les entrées utilisateur pour éviter les attaques XSS
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return "";
  
  // Simple fonction de sanitisation qui échappe les caractères spéciaux HTML
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Validation renforcée des entrées du formulaire RSVP
 */
export const validateRsvpInput = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Validation du nom
  if (!data.name || data.name.trim().length < 2) {
    errors.push("Le nom doit contenir au moins 2 caractères");
  }
  
  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push("L'adresse email n'est pas valide");
  }
  
  // Validation du nombre d'invités
  if (data.attending === true && (isNaN(data.guest_count) || data.guest_count < 0 || data.guest_count > 4)) {
    errors.push("Le nombre d'invités doit être entre 0 et 4");
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Enregistre une action de sécurité pour l'audit
 */
export const logSecurityEvent = async (eventType: string, details: any): Promise<void> => {
  try {
    await supabase.from('security_logs').insert([{
      event_type: eventType,
      details: JSON.stringify(details),
      created_at: new Date().toISOString()
    }]);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'événement de sécurité:", error);
  }
}
