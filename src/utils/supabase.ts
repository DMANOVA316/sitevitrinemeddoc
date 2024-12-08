import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const getPublicUrl = (path: string): string => {
  if (!path) return '';
  
  // Si l'URL est déjà complète, la retourner telle quelle
  if (path.startsWith('http')) {
    return path;
  }

  // Construire l'URL publique du bucket
  const { data } = supabase.storage
    .from('images')
    .getPublicUrl(path);

  return data.publicUrl;
};

export default supabase;