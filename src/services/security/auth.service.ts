
import { logSecurityEvent } from "./logging.service";
import CryptoJS from "crypto-js";

// Constantes de sécurité pour l'authentification
const LOGIN_ATTEMPTS_KEY = "login-attempts";
const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_TIME = 30 * 60 * 1000; // 30 minutes en millisecondes

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
  const key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 15000 }).toString();
  
  // Hash pour "Frank1992@"
  const expectedHash = "45fc11a29a906a9c05e5e218e9179893503e4634c3a08aaa49c8b079edfec180"; 
  
  const result = key === expectedHash;
  
  // Journaliser la tentative d'authentification (sans le mot de passe)
  logSecurityEvent(result ? "admin_login_success" : "admin_login_failed", {
    timestamp: new Date().toISOString()
  });
  
  return result;
}
