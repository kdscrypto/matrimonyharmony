
import { logSecurityEvent } from "./logging.service";
import { sanitizeInput } from "./sanitize.service";
import { analyzeObject, AttackType } from "./attack-detection.service";

/**
 * Validation renforcée des entrées du formulaire RSVP
 */
export const validateRsvpInput = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Analyse de sécurité avancée
  const attackResults = analyzeObject(data, "rsvp_form");
  if (attackResults.length > 0) {
    // On a détecté des tentatives d'attaque
    logSecurityEvent("attack_detected_in_form", {
      form: "rsvp",
      attacks: attackResults.map(r => ({
        type: r.type,
        confidence: r.confidence,
        details: r.details
      }))
    });
    
    // Bloquer la validation si des attaques à haute confiance sont détectées
    const highConfidenceAttacks = attackResults.filter(r => r.confidence > 0.8);
    if (highConfidenceAttacks.length > 0) {
      errors.push("Contenu non autorisé détecté dans le formulaire. Veuillez vérifier vos entrées.");
      return { valid: false, errors };
    }
  }
  
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

