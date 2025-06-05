import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validation des variables d'environnement
if (!supabaseUrl) {
  console.error('VITE_SUPABASE_URL is not defined');
  console.error('Available env vars:', Object.keys(import.meta.env));
  throw new Error('supabaseUrl is required.');
}

if (!supabaseKey) {
  console.error('VITE_SUPABASE_ANON_KEY is not defined');
  console.error('Available env vars:', Object.keys(import.meta.env));
  throw new Error('supabaseKey is required.');
}

console.log('Supabase URL:', supabaseUrl.substring(0, 20) + '...');
console.log('Supabase Key:', supabaseKey.substring(0, 20) + '...');

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
  },
});

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