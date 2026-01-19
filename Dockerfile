# Многоступенчатая сборка
FROM node:20-alpine AS builder

# Установка рабочей директории
WORKDIR /app

# Копирование файлов зависимостей
COPY package.json ./

# Установка зависимостей с кэшированием
RUN npm install --frozen-lockfile || npm install

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN npm run build

# Продакшен образ
FROM node:20-alpine AS runner

WORKDIR /app

# Установка serve для статики
RUN npm install -g serve

# Копирование собранного приложения из builder
COPY --from=builder /app/dist ./dist

# Открытие порта
EXPOSE 8080

# Запуск сервера
CMD ["serve", "-s", "dist", "-l", "8080"]
