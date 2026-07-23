# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Build arguments for Vite environment variables
ARG VITE_API_URL
ARG VITE_API_KEY

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение с переменными окружения
RUN VITE_API_URL=${VITE_API_URL} VITE_API_KEY=${VITE_API_KEY} npm run build

# Stage 2: Production
FROM nginx:alpine

# Копируем nginx конфигурацию
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранное приложение из builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
