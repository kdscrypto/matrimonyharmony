
import { supabase } from "@/integrations/supabase/client";
import { sanitizeInput, validateRsvpInput, logSecurityEvent } from "@/services/security.service";

interface RsvpData {
  name: string;
  email: string;
  attending: boolean;
  guest_count: number;
  dietary_restrictions: string | null;
  message: string | null;
}

export const submitRsvp = async (data: RsvpData) => {
  // Vérifier que nous avons des données valides
  const sanitizedData = {
    ...data,
    name: sanitizeInput(data.name),
    email: sanitizeInput(data.email),
    dietary_restrictions: data.dietary_restrictions ? sanitizeInput(data.dietary_restrictions) : null,
    message: data.message ? sanitizeInput(data.message) : null
  };
  
  // Validation des entrées
  const validation = validateRsvpInput(sanitizedData);
  if (!validation.valid) {
    throw new Error(`Validation échouée: ${validation.errors.join(", ")}`);
  }
  
  // Ajouter une limite de débit pour éviter les abus (pas plus de 5 soumissions par heure)
  const hourAgo = new Date();
  hourAgo.setHours(hourAgo.getHours() - 1);
  
  const { data: recentSubmissions, error: countError } = await supabase
    .from('rsvps')
    .select('created_at')
    .eq('email', sanitizedData.email)
    .gte('created_at', hourAgo.toISOString());
  
  if (countError) {
    console.error("Erreur lors de la vérification des soumissions récentes:", countError);
  } else if (recentSubmissions && recentSubmissions.length >= 5) {
    // Journaliser la tentative d'abus
    await logSecurityEvent("rsvp_rate_limit_exceeded", { 
      email: sanitizedData.email,
      submissions_count: recentSubmissions.length
    });
    
    throw new Error("Trop de soumissions récentes. Veuillez réessayer plus tard.");
  }

  // Insérer les données dans la base de données
  const { error } = await supabase
    .from('rsvps')
    .insert([sanitizedData]);
  
  if (error) {
    console.error("Erreur lors de la soumission du RSVP:", error);
    await logSecurityEvent("rsvp_submission_error", { 
      error: error.message,
      data: sanitizedData
    });
    throw error;
  }
  
  // Journaliser le succès de la soumission
  await logSecurityEvent("rsvp_submission_success", { 
    email: sanitizedData.email,
    attending: sanitizedData.attending
  });
};

export const getAllRsvps = async () => {
  // Vérifier l'authentification côté client avant toute tentative de récupération des données
  const authStatus = localStorage.getItem("admin-auth");
  if (authStatus !== "authenticated") {
    await logSecurityEvent("unauthorized_rsvp_access_attempt", {
      timestamp: new Date().toISOString()
    });
    throw new Error("Non autorisé à accéder aux données RSVP");
  }
  
  const { data, error } = await supabase
    .from('rsvps')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    await logSecurityEvent("rsvp_fetch_error", { error: error.message });
    throw error;
  }
  
  // Journaliser l'accès aux données
  await logSecurityEvent("rsvp_data_accessed", { 
    count: data?.length || 0,
    timestamp: new Date().toISOString()
  });
  
  return data;
};

// Fonction pour supprimer un RSVP (admin uniquement)
export const deleteRsvp = async (id: string) => {
  // Vérifier l'authentification côté client
  const authStatus = localStorage.getItem("admin-auth");
  if (authStatus !== "authenticated") {
    await logSecurityEvent("unauthorized_rsvp_deletion_attempt", {
      id,
      timestamp: new Date().toISOString()
    });
    throw new Error("Non autorisé à supprimer des données RSVP");
  }
  
  const { error } = await supabase
    .from('rsvps')
    .delete()
    .eq('id', id);
  
  if (error) {
    await logSecurityEvent("rsvp_deletion_error", { 
      id,
      error: error.message 
    });
    throw error;
  }
  
  // Journaliser la suppression
  await logSecurityEvent("rsvp_deleted", { 
    id,
    timestamp: new Date().toISOString()
  });
};
