-- Configuration des politiques RLS pour la bibliothèque numérique

-- 1. Table documents
-- Activer RLS sur la table documents
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre à tous les utilisateurs authentifiés de lire tous les documents
CREATE POLICY "Les utilisateurs authentifiés peuvent lire tous les documents"
ON documents FOR SELECT
TO authenticated
USING (true);

-- Politique pour permettre aux utilisateurs non authentifiés de lire uniquement les documents publics
CREATE POLICY "Les utilisateurs non authentifiés peuvent lire uniquement les documents publics"
ON documents FOR SELECT
TO anon
USING (is_public = true);

-- Politique pour permettre aux utilisateurs authentifiés d'insérer leurs propres documents
CREATE POLICY "Les utilisateurs authentifiés peuvent insérer leurs propres documents"
ON documents FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Politique pour permettre aux utilisateurs authentifiés de mettre à jour leurs propres documents
CREATE POLICY "Les utilisateurs authentifiés peuvent mettre à jour leurs propres documents"
ON documents FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Politique pour permettre aux utilisateurs authentifiés de supprimer leurs propres documents
CREATE POLICY "Les utilisateurs authentifiés peuvent supprimer leurs propres documents"
ON documents FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- 2. Table access_stats
-- Activer RLS sur la table access_stats
ALTER TABLE access_stats ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre à tous les utilisateurs authentifiés de lire toutes les statistiques
CREATE POLICY "Les utilisateurs authentifiés peuvent lire toutes les statistiques"
ON access_stats FOR SELECT
TO authenticated
USING (true);

-- Politique pour permettre aux utilisateurs authentifiés d'insérer des statistiques
CREATE POLICY "Les utilisateurs authentifiés peuvent insérer des statistiques"
ON access_stats FOR INSERT
TO authenticated
WITH CHECK (true);

-- Politique pour permettre aux utilisateurs non authentifiés d'insérer des statistiques
CREATE POLICY "Les utilisateurs non authentifiés peuvent insérer des statistiques"
ON access_stats FOR INSERT
TO anon
WITH CHECK (true);

-- 3. Bucket de stockage documents
-- Note: Les politiques pour les buckets de stockage doivent être configurées via l'interface Supabase
-- Voici les politiques recommandées:

/*
Pour le bucket "documents":

1. Politique SELECT (lecture):
   - Nom: "Tout le monde peut lire les fichiers"
   - Définition: true
   - Rôles: anon, authenticated

2. Politique INSERT (création):
   - Nom: "Les utilisateurs authentifiés peuvent uploader des fichiers"
   - Définition: auth.role() = 'authenticated'
   - Rôles: authenticated

3. Politique UPDATE (mise à jour):
   - Nom: "Les utilisateurs authentifiés peuvent mettre à jour des fichiers"
   - Définition: auth.role() = 'authenticated'
   - Rôles: authenticated

4. Politique DELETE (suppression):
   - Nom: "Les utilisateurs authentifiés peuvent supprimer des fichiers"
   - Définition: auth.role() = 'authenticated'
   - Rôles: authenticated
*/
