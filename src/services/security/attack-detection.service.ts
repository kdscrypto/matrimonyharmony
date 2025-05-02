
import { logSecurityEvent } from "./logging.service";

/**
 * Types d'attaques à détecter
 */
export enum AttackType {
  SQL_INJECTION = "sql_injection",
  XSS = "xss_attempt",
  COMMAND_INJECTION = "command_injection",
  PATH_TRAVERSAL = "path_traversal",
  SUSPICIOUS_INPUT = "suspicious_input"
}

interface DetectionResult {
  isAttack: boolean;
  type: AttackType | null;
  confidence: number; // 0-1, où 1 est une certitude complète
  details: string;
}

/**
 * Détecte les tentatives d'injection SQL
 */
const detectSqlInjection = (input: string): boolean => {
  // Recherche des motifs communs d'injection SQL
  const sqlPatterns = [
    /'\s*OR\s*'1'\s*=\s*'1/i,
    /'\s*OR\s*1\s*=\s*1/i,
    /'\s*OR\s*'\d+'\s*=\s*'\d+/i,
    /'\s*--/i,
    /;\s*DROP\s+TABLE/i,
    /UNION\s+ALL\s+SELECT/i,
    /UNION\s+SELECT/i,
    /SELECT\s+.*\s+FROM/i,
    /INSERT\s+INTO/i,
    /DELETE\s+FROM/i,
    /UPDATE\s+.*\s+SET/i,
    /EXEC\s*\(/i,
    /EXECUTE\s*\(/i
  ];

  return sqlPatterns.some(pattern => pattern.test(input));
};

/**
 * Détecte les tentatives d'attaque XSS
 */
const detectXssAttempt = (input: string): boolean => {
  // Recherche des motifs communs d'attaque XSS
  const xssPatterns = [
    /<script[\s\S]*?>/i,
    /<iframe[\s\S]*?>/i,
    /javascript:/i,
    /onerror=/i,
    /onload=/i,
    /onclick=/i,
    /onmouseover=/i,
    /eval\s*\(/i,
    /document\.cookie/i,
    /document\.write/i
  ];

  return xssPatterns.some(pattern => pattern.test(input));
};

/**
 * Détecte les tentatives de command injection
 */
const detectCommandInjection = (input: string): boolean => {
  // Recherche des caractères suspects utilisés pour l'injection de commandes
  const commandPatterns = [
    /;\s*\w+/i,
    /\|\s*\w+/i,
    /`.*`/,
    /\$\(.+\)/,
    /&&\s*\w+/i,
    /\|\|\s*\w+/i
  ];

  return commandPatterns.some(pattern => pattern.test(input));
};

/**
 * Détecte les tentatives de path traversal
 */
const detectPathTraversal = (input: string): boolean => {
  // Recherche des motifs communs de path traversal
  const traversalPatterns = [
    /\.\.\//,
    /\.\.\\/,
    /\.\.%2f/i,
    /\.\.%5c/i
  ];

  return traversalPatterns.some(pattern => pattern.test(input));
};

/**
 * Analyse les entrées pour détecter les attaques potentielles
 * @param input - Texte à analyser
 * @param source - Source de l'entrée (formulaire, paramètre, etc.)
 * @returns Résultat de la détection
 */
export const detectAttack = (input: string, source: string): DetectionResult => {
  if (!input) {
    return { 
      isAttack: false, 
      type: null, 
      confidence: 0, 
      details: "Entrée vide"
    };
  }

  // Vérification des différents types d'attaques
  if (detectSqlInjection(input)) {
    logSecurityEvent(AttackType.SQL_INJECTION, { 
      input: input.substring(0, 100), // Tronquer pour éviter une journalisation excessive
      source
    });
    return {
      isAttack: true,
      type: AttackType.SQL_INJECTION,
      confidence: 0.85,
      details: "Motif d'injection SQL détecté"
    };
  }
  
  if (detectXssAttempt(input)) {
    logSecurityEvent(AttackType.XSS, { 
      input: input.substring(0, 100),
      source
    });
    return {
      isAttack: true,
      type: AttackType.XSS,
      confidence: 0.9,
      details: "Tentative d'injection de script détectée"
    };
  }
  
  if (detectCommandInjection(input)) {
    logSecurityEvent(AttackType.COMMAND_INJECTION, { 
      input: input.substring(0, 100),
      source
    });
    return {
      isAttack: true,
      type: AttackType.COMMAND_INJECTION,
      confidence: 0.75,
      details: "Motif d'injection de commande détecté"
    };
  }
  
  if (detectPathTraversal(input)) {
    logSecurityEvent(AttackType.PATH_TRAVERSAL, { 
      input: input.substring(0, 100),
      source
    });
    return {
      isAttack: true,
      type: AttackType.PATH_TRAVERSAL,
      confidence: 0.8,
      details: "Tentative de path traversal détectée"
    };
  }
  
  // Détection d'autres entrées suspectes
  const suspiciousPatterns = [
    /(\%27|\').*(\%27|\')/i,  // Caractères encodés suspects
    /((\%3C)|<|(\u003c)).*((\%3E)|>|(\u003e))/i, // Balises encodées de différentes façons
    /\<\!\[CDATA\[.*\]\]\>/i  // CDATA XML injection
  ];
  
  if (suspiciousPatterns.some(pattern => pattern.test(input))) {
    logSecurityEvent(AttackType.SUSPICIOUS_INPUT, { 
      input: input.substring(0, 100),
      source
    });
    return {
      isAttack: true,
      type: AttackType.SUSPICIOUS_INPUT,
      confidence: 0.6,
      details: "Entrée suspecte détectée"
    };
  }

  return {
    isAttack: false,
    type: null,
    confidence: 0,
    details: "Aucune menace détectée"
  };
};

/**
 * Analyse un objet complet pour y détecter des attaques potentielles
 * @param data - Objet à analyser (ex: formulaire)
 * @param source - Source des données
 */
export const analyzeObject = (data: Record<string, any>, source: string): DetectionResult[] => {
  const results: DetectionResult[] = [];
  
  // Parcourir les propriétés de l'objet et analyser chaque chaîne
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key) && typeof data[key] === 'string') {
      const result = detectAttack(data[key], `${source}.${key}`);
      if (result.isAttack) {
        results.push(result);
      }
    }
  }
  
  return results;
};

/**
 * Vérifie si une entrée est sécuritaire
 * @param input - Texte à vérifier
 * @param source - Source de l'entrée
 * @returns true si l'entrée est sécuritaire
 */
export const isSafeInput = (input: string, source: string): boolean => {
  const result = detectAttack(input, source);
  return !result.isAttack;
};

