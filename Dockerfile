# Utiliser directement Nginx et copier le build pré-fait
FROM nginx:alpine

# Copier le build pré-fait depuis GitHub Actions
COPY dist /usr/share/nginx/html

# Supprime la config par défaut de Nginx (optionnel)
RUN rm /etc/nginx/conf.d/default.conf

# Ajoute ta propre config Nginx si besoin
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
