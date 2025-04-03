
import { supabase } from "@/integrations/supabase/client";

interface RsvpData {
  name: string;
  email: string;
  attending: boolean;
  guest_count: number;
  dietary_restrictions: string | null;
  message: string | null;
}

export const submitRsvp = async (data: RsvpData) => {
  const { error } = await supabase
    .from('rsvps')
    .insert([data]);
  
  if (error) throw error;
};

export const getAllRsvps = async () => {
  const { data, error } = await supabase
    .from('rsvps')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};
