#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

// Lire les variables d'environnement depuis les arguments ou l'environnement
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('=== Build avec injection des variables d\'environnement ===');
console.log('VITE_SUPABASE_URL:', supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : 'NON DÉFINIE');
console.log('VITE_SUPABASE_ANON_KEY:', supabaseKey ? supabaseKey.substring(0, 30) + '...' : 'NON DÉFINIE');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables d\'environnement manquantes !');
  console.error('VITE_SUPABASE_URL:', !!supabaseUrl);
  console.error('VITE_SUPABASE_ANON_KEY:', !!supabaseKey);
  process.exit(1);
}

// Créer le fichier .env
const envContent = `VITE_SUPABASE_URL=${supabaseUrl}
VITE_SUPABASE_ANON_KEY=${supabaseKey}
`;

fs.writeFileSync('.env', envContent);
console.log('✅ Fichier .env créé');

// Vérifier le contenu
console.log('Contenu du fichier .env:');
console.log(fs.readFileSync('.env', 'utf8'));

// Lancer le build
console.log('🔨 Lancement du build...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build terminé avec succès');
  
  // Vérifier que le build contient les variables
  console.log('🔍 Vérification du build...');
  const distFiles = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
  console.log('Fichiers JS générés:', distFiles);
  
  // Chercher les variables dans les fichiers JS
  let found = false;
  for (const file of distFiles) {
    const content = fs.readFileSync(`dist/assets/${file}`, 'utf8');
    if (content.includes('supabase.co')) {
      console.log(`✅ URL Supabase trouvée dans ${file}`);
      found = true;
      break;
    }
  }
  
  if (!found) {
    console.log('⚠️  URL Supabase non trouvée dans les fichiers JS');
  }
  
} catch (error) {
  console.error('❌ Erreur lors du build:', error.message);
  process.exit(1);
}
