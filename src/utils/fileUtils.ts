export const getFileNameFromPath = (path: string | null): string => {
  if (!path) return 'Non défini';
  
  // Si c'est une URL complète, on extrait le dernier segment après le dernier '/'
  const segments = path.split('/');
  return segments[segments.length - 1] || 'Non défini';
};
