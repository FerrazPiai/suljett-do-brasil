FROM nginx:alpine
# O site é gerado por `npm run build` (build.mjs + eleventy) na pasta _site/.
# Rode o build ANTES do docker build (mesmo fluxo de antes, agora via npm).
COPY _site/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
