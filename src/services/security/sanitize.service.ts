
import { detectAttack, AttackType } from "./attack-detection.service";
import { logSecurityEvent } from "./logging.service";

/**
 * Sanitise les entrées utilisateur pour éviter les attaques XSS
 * Version renforcée avec échappement HTML plus complet et détection d'attaques
 */
export const sanitizeInput = (input: string, source: string = "unknown"): string => {
  if (!input) return "";
  
  // Détection d'attaques potentielles avant sanitisation
  const detectionResult = detectAttack(input, source);
  if (detectionResult.isAttack) {
    // Journaliser la tentative d'attaque
    logSecurityEvent("attack_attempt_detected", {
      input: input.substring(0, 100), // Tronquer pour éviter une journalisation excessive
      attack_type: detectionResult.type,
      confidence: detectionResult.confidence,
      source
    });
    
    // Si c'est une attaque à haute confiance, on pourrait prendre des mesures supplémentaires
    if (detectionResult.confidence > 0.8) {
      console.warn(`Tentative d'attaque détectée: ${detectionResult.type} (${source})`);
    }
  }
  
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
 * Version corrigée qui sanitise un objet entier
 * Corrige l'erreur de typage TypeScript
 */
export const sanitizeObject = <T extends Record<string, any>>(data: T, prefix: string = "form"): T => {
  const result = { ...data };
  
  for (const key in result) {
    if (Object.prototype.hasOwnProperty.call(result, key) && typeof result[key] === 'string') {
      // Cast explicite pour indiquer à TypeScript que nous préservons le type
      result[key] = sanitizeInput(result[key], `${prefix}.${key}`) as T[Extract<keyof T, string>];
    }
  }
  
  return result;
}
