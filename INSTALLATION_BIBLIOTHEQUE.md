# Guide d'installation de la bibliothèque numérique

Ce guide vous aidera à configurer correctement la bibliothèque numérique dans Supabase.

## 1. Création des tables

Connectez-vous à votre projet Supabase et accédez à l'éditeur SQL. Exécutez les requêtes suivantes pour créer les tables nécessaires :

```sql
-- Table des documents
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT false,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id)
);

-- Table des statistiques d'accès
CREATE TABLE access_stats (
  id SERIAL PRIMARY KEY,
  document_id INTEGER REFERENCES documents(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création d'index pour améliorer les performances
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_is_public ON documents(is_public);
CREATE INDEX idx_documents_category ON documents(category);
CREATE INDEX idx_access_stats_document_id ON access_stats(document_id);
```

## 2. Création du bucket de stockage

1. Accédez à la section "Storage" dans le menu de gauche
2. Cliquez sur "Create a new bucket"
3. Nommez le bucket "documents"
4. Cochez "Public bucket" pour permettre l'accès public aux fichiers
5. Cliquez sur "Create bucket"

## 3. Configuration des politiques de sécurité (RLS)

### 3.1. Politiques pour la table documents

Exécutez les requêtes SQL suivantes pour configurer les politiques de sécurité pour la table documents :

```sql
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
```

### 3.2. Politiques pour la table access_stats

Exécutez les requêtes SQL suivantes pour configurer les politiques de sécurité pour la table access_stats :

```sql
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
```

### 3.3. Politiques pour le bucket de stockage

1. Accédez à la section "Storage" dans le menu de gauche
2. Cliquez sur le bucket "documents"
3. Cliquez sur l'onglet "Policies"
4. Ajoutez les politiques suivantes :

#### Politique SELECT (lecture)
- Nom: "Tout le monde peut lire les fichiers"
- Définition: `true`
- Rôles: anon, authenticated

#### Politique INSERT (création)
- Nom: "Les utilisateurs authentifiés peuvent uploader des fichiers"
- Définition: `auth.role() = 'authenticated'`
- Rôles: authenticated

#### Politique UPDATE (mise à jour)
- Nom: "Les utilisateurs authentifiés peuvent mettre à jour des fichiers"
- Définition: `auth.role() = 'authenticated'`
- Rôles: authenticated

#### Politique DELETE (suppression)
- Nom: "Les utilisateurs authentifiés peuvent supprimer des fichiers"
- Définition: `auth.role() = 'authenticated'`
- Rôles: authenticated

## 4. Mise à jour des documents existants

Si vous avez déjà des documents dans la base de données qui n'ont pas de propriétaire (champ `user_id` vide), vous devez les mettre à jour pour pouvoir les modifier ou les supprimer. Exécutez le script suivant dans l'éditeur SQL de Supabase :

```sql
-- Récupérer l'ID de l'utilisateur administrateur
-- Remplacez 'admin@example.com' par l'email de l'administrateur
SELECT id FROM auth.users WHERE email = 'admin@example.com' LIMIT 1;

-- Mettre à jour tous les documents sans propriétaire
-- Remplacez 'USER_ID_HERE' par l'ID obtenu à l'étape précédente
UPDATE documents
SET user_id = 'USER_ID_HERE'
WHERE user_id IS NULL;
```

## 5. Résolution des problèmes courants

### 5.1. Erreur "new row violates row-level security policy"

Cette erreur se produit lorsque vous essayez d'insérer, de mettre à jour ou de supprimer une ligne qui ne respecte pas les politiques RLS. Pour résoudre ce problème :

1. **Vérifiez que l'utilisateur est authentifié** : Assurez-vous que l'utilisateur est connecté avant d'effectuer des opérations d'écriture.

2. **Vérifiez que l'utilisateur est le propriétaire du document** : Pour les opérations de mise à jour et de suppression, l'utilisateur doit être le propriétaire du document (champ `user_id` égal à l'ID de l'utilisateur).

3. **Mettez à jour les politiques RLS** : Si vous souhaitez permettre à tous les utilisateurs authentifiés de modifier et supprimer tous les documents, vous pouvez mettre à jour les politiques RLS :

```sql
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
```

### 5.2. Erreur lors de l'upload de fichiers

Si vous rencontrez des erreurs lors de l'upload de fichiers, vérifiez les politiques du bucket de stockage "documents" :

1. Accédez à la section "Storage" dans le menu de gauche
2. Cliquez sur le bucket "documents"
3. Cliquez sur l'onglet "Policies"
4. Assurez-vous que vous avez une politique qui permet aux utilisateurs authentifiés d'uploader des fichiers

## 6. Vérification

Après avoir configuré toutes les politiques, vous devriez pouvoir :
- Ajouter des documents en tant qu'utilisateur authentifié
- Voir tous les documents en tant qu'utilisateur authentifié
- Voir uniquement les documents publics en tant qu'utilisateur non authentifié
- Modifier et supprimer vos propres documents
- Enregistrer des statistiques d'accès pour tous les utilisateurs

Si vous rencontrez des erreurs, vérifiez les journaux dans la section "Logs" de Supabase pour identifier le problème.
