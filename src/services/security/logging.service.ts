
import { supabase } from "@/integrations/supabase/client";

/**
 * Enregistre une action de sécurité pour l'audit
 */
export const logSecurityEvent = async (eventType: string, details: any): Promise<void> => {
  try {
    // Au lieu d'insérer dans une table non-existante,
    // nous journalisons l'événement dans la console
    console.log("[Security Event]", {
      event_type: eventType,
      details,
      created_at: new Date().toISOString()
    });
    
    // En environnement de production, si vous souhaitez conserver ces logs,
    // vous devrez créer une table security_logs dans votre base de données Supabase
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'événement de sécurité:", error);
  }
}
