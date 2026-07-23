# 🐳 Docker Development Guide

## Prerequisites

- Docker (18.09 или выше)
- Docker Compose (1.24 или выше)

### Установка Docker

**Windows (WSL2):**
- Загрузите [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)
- Установите с WSL2 бэкэндом
- Перезагрузитесь

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install docker.io docker-compose
sudo usermod -aG docker $USER
```

**macOS:**
- Загрузите [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)
- Установите и запустите

## 🚀 Быстрый старт

### 1. Запустите все сервисы

```bash
# Из корня проекта
docker-compose up -d
```

Это создаст и запустит:
- **API сервер** на http://localhost:5000
- **Веб-приложение** на http://localhost:3000

### 2. Проверьте статус

```bash
docker-compose ps
```

Вы должны увидеть оба сервиса в статусе "Up":
```
NAME                   STATUS
ingenious-api         Up (healthy)
ingenious-web         Up (healthy)
```

### 3. Тестируйте приложение

Откройте в браузере: http://localhost:3000

## 📋 Полезные команды

### Запуск

```bash
# Запустить в фоновом режиме
docker-compose up -d

# Запустить с логами
docker-compose up

# Запустить только API
docker-compose up -d api

# Запустить только веб
docker-compose up -d web
```

### Остановка

```bash
# Остановить все
docker-compose stop

# Полностью удалить контейнеры
docker-compose down

# Удалить контейнеры и volumes
docker-compose down -v
```

### Логирование

```bash
# Логи всех сервисов
docker-compose logs -f

# Логи только API
docker-compose logs -f api

# Логи только web
docker-compose logs -f web

# Последние 100 строк
docker-compose logs --tail=100
```

### Выполнение команд

```bash
# Подключиться к API контейнеру
docker-compose exec api bash

# Запустить Python команду
docker-compose exec api python -c "import sys; print(sys.version)"

# Подключиться к web контейнеру
docker-compose exec web bash

# Просмотреть переменные окружения
docker-compose exec api env | grep -E "TELEGRAM|API_KEY"
```

### Перестройка

```bash
# Пересобрать образы
docker-compose build

# Пересобрать и запустить
docker-compose up -d --build

# Очистить все образы
docker image prune -a
```

## 🔧 Конфигурация

### Переменные окружения

Находятся в `.env.docker` файле:

```env
# Telegram Bot
TELEGRAM_BOT_TOKEN=ваш_токен
ADMIN_IDS=[ваш_id]
MANAGER_IDS=[]
API_KEY=ваш_api_key

# Frontend
VITE_API_URL=http://api:5000
VITE_API_KEY=ваш_api_key
```

### Изменение конфигурации

1. Отредактируйте `.env.docker`
2. Пересоберите: `docker-compose up -d --build`

## 🔍 Отладка

### Проверка здоровья API

```bash
docker-compose exec api curl http://localhost:5000/health
```

Ответ должен быть:
```json
{
  "status": "ok",
  "bot_initialized": true,
  "authorized_ids_count": 1
}
```

### Проверка логов API

```bash
docker-compose logs -f api
```

Ищите ошибки в виде:
```
ERROR:root:...
Exception:...
```

### Проверка логов Web

```bash
docker-compose logs -f web
```

### Тестирование API из контейнера

```bash
docker-compose exec api python test_api.py
```

## 📊 Архитектура

```
┌─────────────────────────────┐
│   Docker Compose Network    │
│  (ingenious-network)        │
│                             │
│  ┌─────────────┐  ┌────────┐│
│  │ API Server  │  │   Web  ││
│  │  :5000      │  │ :3000  ││
│  │ (Python)    │  │(Nginx) ││
│  └─────────────┘  └────────┘│
│        ▲              ▲      │
│        │              │      │
│ Lo: :5000    Lo: :3000        │
│        │              │      │
└────┼──────────────┼──────────┘
     │              │
  Host Network
     │              │
Host Ports :5000  :3000
```

## 🚨 Проблемы и решения

### "Port 5000 already in use"

```bash
# Найти процесс на порте
lsof -i :5000

# Килл процесс (Unix)
kill -9 <PID>

# Или использовать другой порт в docker-compose.yml
```

### "Cannot connect to API from web"

Убедитесь, что в `.env.docker`:
```env
VITE_API_URL=http://api:5000
```

Внутри Docker-сети используйте имя сервиса `api`, а не `localhost`.

### "Health check failed"

Проверьте логи:
```bash
docker-compose logs api
```

Убедитесь, что BOT_TOKEN и Admin IDs установлены правильно.

### "Docker daemon not running"

**Windows:** Запустите Docker Desktop  
**Linux:** `sudo systemctl start docker`  
**macOS:** Запустите Docker из Applications

## 🔐 Security в Docker

1. **Не коммитьте `.env.docker`**
   ```bash
   echo ".env.docker" >> .gitignore
   ```

2. **Используйте secrets для production:**
   ```bash
   docker secrets create telegram_token secret.txt
   ```

3. **не запускайте как root:**
   ```bash
   # Добавьте пользователя в docker group
   sudo usermod -aG docker $USER
   ```

## 📈 Production развертывание

Для production используйте `docker-compose.prod.yml`:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

Отличия:
- Gunicorn с 4 workers
- Health checks более строгие
- Логирование более подробное

## 📚 Дополнительные ресурсы

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Best Practices for Python Docker](https://docs.docker.com/language/python/build-images/)

## ✨ Полезные советы

### Использовать docker-compose.override.yml для локальной разработки

Создайте `docker-compose.override.yml`:
```yaml
version: '3.8'

services:
  api:
    volumes:
      - ./telegram_bot:/app
    environment:
      - FLASK_DEBUG=1
```

Этот файл автоматически применится при запуске `docker-compose up`.

### Масштабирование

```bash
# Запустить 3 копии web сервиса
docker-compose up -d --scale web=3
```

### Использование .env файла с docker-compose

```bash
# Использовать конкретный .env файл
docker-compose --env-file=.env.docker up -d
```

---

✨ **Готово к использованию Docker!**
