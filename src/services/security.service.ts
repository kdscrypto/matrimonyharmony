
// Ce fichier reste pour assurer la compatibilité avec le code existant
// Il ré-exporte simplement toutes les fonctions de la nouvelle structure modulaire
import {
  isLoginBlocked,
  getRemainingLockoutTime,
  recordFailedLoginAttempt,
  resetLoginAttempts,
  verifyAdminPassword,
  generateCSRFToken,
  validateCSRFToken,
  sanitizeInput,
  validateRsvpInput,
  logSecurityEvent
} from './security/index';

export {
  isLoginBlocked,
  getRemainingLockoutTime,
  recordFailedLoginAttempt,
  resetLoginAttempts,
  verifyAdminPassword,
  generateCSRFToken,
  validateCSRFToken,
  sanitizeInput,
  validateRsvpInput,
  logSecurityEvent
};
