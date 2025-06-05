# Étape 1 : Builder l'application avec les variables d'environnement
FROM node:18-alpine AS build

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
RUN npm ci

# Copier le code source
COPY . .

# Arguments de build pour les variables d'environnement
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

# Créer le fichier .env avec les variables
RUN echo "VITE_SUPABASE_URL=${VITE_SUPABASE_URL}" > .env && \
    echo "VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}" >> .env && \
    cat .env

# Builder l'application
RUN npm run build

# Étape 2 : Servir avec Nginx
FROM nginx:alpine

# Copier le build depuis l'étape précédente
COPY --from=build /app/dist /usr/share/nginx/html

# Supprime la config par défaut de Nginx (optionnel)
RUN rm /etc/nginx/conf.d/default.conf

# Ajoute ta propre config Nginx si besoin
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
