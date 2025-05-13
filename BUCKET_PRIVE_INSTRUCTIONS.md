# Guide de configuration du bucket privé pour la bibliothèque numérique

Ce guide vous explique comment configurer le bucket de stockage "documents" en mode privé dans Supabase, et comment les modifications du code ont été implémentées pour prendre en charge ce changement.

## 1. Modifications du code

Les modifications suivantes ont été apportées au code pour prendre en charge un bucket privé :

### 1.1. Service d'upload de documents (`documentUploadService.ts`)

- Remplacement de `getPublicUrl` par `createSignedUrl` pour générer des URLs temporaires signées
- Ajout d'une durée d'expiration pour les URLs signées (60 minutes par défaut)
- Amélioration de la méthode `deleteFile` pour gérer les URLs signées
- Ajout d'une méthode `extractFileName` pour extraire le nom du fichier à partir d'une URL
- Ajout d'une méthode `getSignedUrl` pour obtenir une URL signée pour un fichier existant

### 1.2. Service de gestion des documents (`documentService.ts`)

- Ajout de méthodes pour rafraîchir les URLs des documents : `refreshDocumentUrl` et `refreshDocumentUrls`
- Mise à jour des méthodes `getAllDocuments` et `getDocumentById` pour utiliser les URLs signées

## 2. Configuration du bucket dans Supabase

Pour configurer le bucket "documents" en mode privé, suivez ces étapes :

1. Connectez-vous à votre projet Supabase
2. Accédez à la section "Storage" dans le menu de gauche
3. Cliquez sur le bucket "documents"
4. Cliquez sur l'onglet "Settings"
5. Désactivez l'option "Public bucket" (décochez la case)
6. Cliquez sur "Save"

## 3. Configuration des politiques RLS pour le bucket privé

Après avoir rendu le bucket privé, vous devez configurer les politiques RLS (Row Level Security) pour permettre l'accès aux fichiers :

1. Accédez à la section "Storage" dans le menu de gauche
2. Cliquez sur le bucket "documents"
3. Cliquez sur l'onglet "Policies"
4. Supprimez toutes les politiques existantes
5. Ajoutez les nouvelles politiques suivantes :

### 3.1. Politique SELECT (lecture)

- Nom: "Les utilisateurs authentifiés peuvent lire tous les fichiers"
- Définition: `auth.role() = 'authenticated'`
- Rôles: authenticated

### 3.2. Politique INSERT (création)

- Nom: "Les utilisateurs authentifiés peuvent uploader des fichiers"
- Définition: `auth.role() = 'authenticated'`
- Rôles: authenticated

### 3.3. Politique UPDATE (mise à jour)

- Nom: "Les utilisateurs authentifiés peuvent mettre à jour des fichiers"
- Définition: `auth.role() = 'authenticated'`
- Rôles: authenticated

### 3.4. Politique DELETE (suppression)

- Nom: "Les utilisateurs authentifiés peuvent supprimer des fichiers"
- Définition: `auth.role() = 'authenticated'`
- Rôles: authenticated

## 4. Comportement attendu après les modifications

Avec ces modifications :

1. Seuls les utilisateurs authentifiés peuvent accéder aux fichiers du bucket
2. Les URLs des fichiers sont temporaires et expirent après 60 minutes
3. Les URLs sont automatiquement rafraîchies lorsque les documents sont récupérés
4. Les fichiers restent accessibles aux utilisateurs authentifiés même après l'expiration des URLs (une nouvelle URL est générée)

## 5. Considérations importantes

- Les URLs signées expirent après 60 minutes. Si un utilisateur reste sur la même page pendant plus de 60 minutes, il pourrait ne plus pouvoir accéder aux fichiers sans rafraîchir la page.
- Les URLs signées sont plus longues que les URLs publiques et contiennent des paramètres de requête.
- Les performances peuvent être légèrement affectées car chaque accès à un document nécessite la génération d'une URL signée.

## 6. Dépannage

Si vous rencontrez des problèmes d'accès aux fichiers après avoir configuré le bucket en mode privé :

1. Vérifiez que l'utilisateur est bien authentifié
2. Vérifiez que les politiques RLS sont correctement configurées
3. Vérifiez que les URLs signées sont correctement générées
4. Vérifiez les journaux dans la console du navigateur pour détecter d'éventuelles erreurs

Pour toute question ou problème, n'hésitez pas à contacter l'équipe de développement.
