# syntax=docker/dockerfile:1

FROM node:20-alpine AS builder
WORKDIR /app

# 1) Копируем манифесты зависимостей (и lock!)
COPY package.json package-lock.json* ./

# 2) Ставим зависимости 
RUN npm ci

# 3) Копируем исходники
COPY . .

# 4) Прокидываем VITE_* на этапе build, если нужно "зашить" env в сборку
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# 5) Сборка
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

RUN npm i -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
