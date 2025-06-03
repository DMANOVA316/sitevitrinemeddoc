# Étape 1 : builder l'application
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : servir l'app avec Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Supprime la config par défaut de Nginx (optionnel)
RUN rm /etc/nginx/conf.d/default.conf

# Ajoute ta propre config Nginx si besoin
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
