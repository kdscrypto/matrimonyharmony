
import { supabase } from "@/integrations/supabase/client";

/**
 * Niveaux de gravité pour les événements de sécurité
 */
export enum SecurityEventSeverity {
  INFO = "info",
  WARNING = "warning",
  CRITICAL = "critical"
}

/**
 * Données d'événement de sécurité améliorées
 */
interface SecurityEventData {
  event_type: string;
  details: any;
  severity?: SecurityEventSeverity;
  ip_address?: string;
  user_agent?: string;
}

/**
 * Détermine la gravité d'un événement de sécurité
 */
const determineSeverity = (eventType: string): SecurityEventSeverity => {
  // Liste des événements critiques
  const criticalEvents = [
    "sql_injection", 
    "xss_attempt", 
    "command_injection", 
    "brute_force_attempt",
    "path_traversal", 
    "attack_detected_in_form"
  ];
  
  // Liste des événements d'avertissement
  const warningEvents = [
    "admin_login_failed",
    "suspicious_input",
    "csrf_validation_failed",
    "multiple_login_attempts"
  ];
  
  if (criticalEvents.some(event => eventType.includes(event))) {
    return SecurityEventSeverity.CRITICAL;
  } else if (warningEvents.some(event => eventType.includes(event))) {
    return SecurityEventSeverity.WARNING;
  }
  
  return SecurityEventSeverity.INFO;
};

/**
 * Collecte les informations du navigateur si disponible
 */
const getBrowserInfo = (): { ip_address?: string, user_agent?: string } => {
  if (typeof window !== 'undefined') {
    return {
      user_agent: navigator.userAgent
    };
  }
  return {};
};

/**
 * Enregistre une action de sécurité pour l'audit
 * Version améliorée avec plus de détails
 */
export const logSecurityEvent = async (eventType: string, details: any): Promise<void> => {
  try {
    // Détermine la gravité
    const severity = determineSeverity(eventType);
    
    // Collecte les informations du navigateur
    const browserInfo = getBrowserInfo();
    
    // Prépare l'événement complet
    const securityEvent: SecurityEventData = {
      event_type: eventType,
      details,
      severity,
      ...browserInfo
    };
    
    // Journalisation dans la console avec différents niveaux selon la gravité
    const timestamp = new Date().toISOString();
    switch (severity) {
      case SecurityEventSeverity.CRITICAL:
        console.error(`[SECURITY CRITICAL] [${timestamp}]`, securityEvent);
        break;
      case SecurityEventSeverity.WARNING:
        console.warn(`[SECURITY WARNING] [${timestamp}]`, securityEvent);
        break;
      default:
        console.log(`[SECURITY INFO] [${timestamp}]`, securityEvent);
    }
    
    // En environnement de production, si vous souhaitez conserver ces logs,
    // vous devrez créer une table security_logs dans votre base de données Supabase
    // et décommenter le code suivant:
    /*
    await supabase
      .from('security_logs')
      .insert([{
        ...securityEvent,
        created_at: timestamp
      }]);
    */
    
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'événement de sécurité:", error);
  }
}

