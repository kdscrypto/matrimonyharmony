
import { logSecurityEvent } from "./logging.service";
import CryptoJS from "crypto-js";

// Constante pour le nom du token CSRF
const TOKEN_NAME = "wedding-csrf-token";

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
