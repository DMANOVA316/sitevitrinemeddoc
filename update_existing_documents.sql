-- Script pour mettre à jour les documents existants sans propriétaire

-- 1. Récupérer l'ID de l'utilisateur administrateur
-- Remplacez 'admin@example.com' par l'email de l'administrateur
SELECT id FROM auth.users WHERE email = 'admin@example.com' LIMIT 1;

-- 2. Mettre à jour tous les documents sans propriétaire
-- Remplacez 'USER_ID_HERE' par l'ID obtenu à l'étape 1
UPDATE documents 
SET user_id = 'USER_ID_HERE' 
WHERE user_id IS NULL;

-- 3. Vérifier que tous les documents ont maintenant un propriétaire
SELECT COUNT(*) FROM documents WHERE user_id IS NULL;

-- 4. Mettre à jour les politiques RLS pour permettre à tous les utilisateurs authentifiés de modifier et supprimer tous les documents
-- Cela est utile si vous voulez une solution temporaire moins restrictive

-- Supprimer les politiques existantes
DROP POLICY IF EXISTS "Les utilisateurs authentifiés peuvent mettre à jour leurs propres documents" ON documents;
DROP POLICY IF EXISTS "Les utilisateurs authentifiés peuvent supprimer leurs propres documents" ON documents;

-- Créer des politiques plus permissives
CREATE POLICY "Les utilisateurs authentifiés peuvent mettre à jour tous les documents" 
ON documents FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Les utilisateurs authentifiés peuvent supprimer tous les documents" 
ON documents FOR DELETE 
TO authenticated 
USING (true);

-- 5. Alternative : Mettre à jour les politiques RLS pour permettre aux utilisateurs authentifiés de modifier et supprimer uniquement leurs propres documents
-- Cela est la solution recommandée pour la sécurité à long terme

-- Supprimer les politiques existantes
DROP POLICY IF EXISTS "Les utilisateurs authentifiés peuvent mettre à jour tous les documents" ON documents;
DROP POLICY IF EXISTS "Les utilisateurs authentifiés peuvent supprimer tous les documents" ON documents;

-- Créer des politiques plus restrictives
CREATE POLICY "Les utilisateurs authentifiés peuvent mettre à jour leurs propres documents" 
ON documents FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Les utilisateurs authentifiés peuvent supprimer leurs propres documents" 
ON documents FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);
