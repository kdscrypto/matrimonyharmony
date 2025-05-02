
// Service de sécurité unifié
// Exporte toutes les fonctions des modules séparés

export {
  isLoginBlocked,
  getRemainingLockoutTime,
  recordFailedLoginAttempt,
  resetLoginAttempts,
  verifyAdminPassword
} from './auth.service';

export {
  generateCSRFToken,
  validateCSRFToken
} from './csrf.service';

export {
  sanitizeInput,
  sanitizeObject
} from './sanitize.service';

export {
  validateRsvpInput
} from './validation.service';

export {
  logSecurityEvent,
  SecurityEventSeverity
} from './logging.service';

export {
  detectAttack,
  analyzeObject,
  isSafeInput,
  AttackType
} from './attack-detection.service';

