import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Safe initialization for build time
export const supabase = (supabaseUrl && supabaseAnonKey) 
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null as any;

export interface PrayerRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  category: 'service' | 'bible_study' | 'special';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Member {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  join_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const checkIsAdmin = async (email: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('admin_users')
    .select('email')
    .eq('email', email)
    .maybeSingle();

  if (error) {
    console.error('Error checking admin status:', error);
    return false;
  }

  return !!data;
};
