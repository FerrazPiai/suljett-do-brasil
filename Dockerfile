# ── Stage 1: build do site com Eleventy ──────────────────────
# O site é gerado DENTRO do container (não depende de build prévio).
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
# --include=dev garante o Eleventy (devDependency) mesmo se NODE_ENV=production
RUN npm ci --include=dev
COPY . .
RUN npm run build

# ── Stage 2: serve estático com nginx ────────────────────────
FROM nginx:alpine
COPY --from=build /app/_site/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
