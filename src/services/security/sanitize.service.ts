
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
