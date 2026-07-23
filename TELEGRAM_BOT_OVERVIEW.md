# 🤖 Telegram Bot Integration - Quick Overview

## Что сделано?

Я создал полную систему для отправки заявок с контактной формы сайта в Telegram боту, который доставляет их только администраторам и менеджерам.

## 📁 Новые файлы

### Telegram Bot (`telegram_bot/` папка)

| Файл | Описание |
|------|---------|
| `api_server.py` | Flask API сервер для обработки заявок |
| `bot.py` | Telegram бот (для future использования) |
| `requirements.txt` | Python зависимости |
| `.env.example` | Пример конфигурации (скопируйте в `.env`) |
| `README.md` | Подробная документация бота |
| `quickstart.sh` | Скрипт для быстрого старта |

### Frontend конфигурация

| Файл | Описание |
|------|---------|
| `.env.local.example` | Пример конфигурации фронтенда (скопируйте в `.env.local`) |

### Документация

| Файл | Описание |
|------|---------|
| `TELEGRAM_SETUP.md` | **Полная пошаговая инструкция** (советую прочитать!) |

## 🚀 Быстрый старт (3 шага)

### 1️⃣ Создайте Telegram бота

- Откройте [@BotFather](https://t.me/botfather)
- Используйте `/newbot`
- Получите **BOT_TOKEN**

### 2️⃣ Получите свой Telegram ID

- Найдите своего бота в Telegram
- Напишите `/myid`
- Получите свой **ID**

### 3️⃣ Настройте конфигурацию

Скопируйте файлы:
```bash
cp telegram_bot/.env.example telegram_bot/.env
cp .env.local.example .env.local
```

Отредактируйте `telegram_bot/.env`:
```env
TELEGRAM_BOT_TOKEN=ваш_токен_от_BotFather
ADMIN_IDS=[ваш_telegram_id]
MANAGER_IDS=[]
API_KEY=какой-то-сложный-ключ-123
```

Отредактируйте `.env.local`:
```env
VITE_API_URL=http://localhost:5000
VITE_API_KEY=какой-то-сложный-ключ-123
```

## 🏃 Запуск системы

**Терминал 1 - API сервер:**
```bash
cd telegram_bot
pip install -r requirements.txt
python api_server.py
```

**Терминал 2 - Фронтенд:**
```bash
npm run dev
```

Откройте: http://localhost:3000

## ✅ Тестирование

1. Откройте http://localhost:3000/контакты
2. Заполните форму "Быстрая заявка"
3. Нажмите "Отправить запрос"
4. Проверьте Telegram - должно придти сообщение 📨

## 📊 Как это работает

```
Пользователь заполняет форму
           ↓
    Нажимает "Отправить"
           ↓
  Frontend отправляет POST на API
           ↓
  API проверяет API_KEY
           ↓
  API отправляет в Telegram Bot API
           ↓
  Telegram доставляет в Telegram чаты админов/менеджеров
           ↓
        ✅ Готово!
```

## 🔑 API Endpoints

### POST `/api/inquiry` - Отправить заявку

```bash
curl -X POST http://localhost:5000/api/inquiry \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ваш-api-key" \
  -d '{
    "name": "Иван",
    "phone": "+7 (921) 123-45-67",
    "message": "Текст заявки"
  }'
```

### GET `/health` - Проверка здоровья

```bash
curl http://localhost:5000/health
```

### GET `/api/status` - Статус бота

```bash
curl -H "X-API-Key: ваш-api-key" http://localhost:5000/api/status
```

## 📋 Основные переменные

| Переменная | Где | Описание |
|-----------|------|---------|
| `TELEGRAM_BOT_TOKEN` | `telegram_bot/.env` | Токен от @BotFather |
| `ADMIN_IDS` | `telegram_bot/.env` | JSON array Telegram IDs администраторов |
| `MANAGER_IDS` | `telegram_bot/.env` | JSON array Telegram IDs менеджеров |
| `API_KEY` | Обе `.env` файлы | Секретный ключ (должен совпадать!) |

## 💡 Обновления в коде

### Contacts.tsx
- ✅ Добавлена отправка данных на API
- ✅ Добавлены loading и error состояния
- ✅ Добавлены успешно отправленные сообщения
- ✅ Интегрирована обработка ошибок

## 🔐 Безопасность

- ✅ API протекетирован API_KEY
- ✅ Используется HTTPS в production
- ✅ Никогда не коммитьте `.env` файлы
- ✅ API_KEY должен быть сложным

## 📚 Дополнительные ресурсы

- **Полная инструкция:** `TELEGRAM_SETUP.md`
- **Документация бота:** `telegram_bot/README.md`
- **Telegram Bot API:** https://core.telegram.org/bots/api

## ❓ Часто задаваемые вопросы

**Q: Как добавить еще администраторов?**
A: Добавьте их Telegram IDs в `ADMIN_IDS` в `telegram_bot/.env` и перезагрузите сервер.

**Q: Что если я забыл свой Telegram ID?**
A: Напишите боту `/myid` и он вам его скажет.

**Q: Может ли сайт отправлять сообщения в какой-то другой час?**
A: Да, можно добавить логику отправки позже или в очередь. Это требует дополнительной разработки.

**Q: Как проверить логи сервера?**
A: Смотрите консоль при запуске `python api_server.py`.

## 🎯 Что дальше?

После успешной интеграции вы можете:

1. **Развернуть на production** (AWS, Heroku, DigitalOcean)
2. **Добавить обработку вложений** (фото, документы)
3. **Создать админ-панель** для просмотра истории заявок
4. **Добавить уведомления** при подтверждении получения заявки
5. **Интегрировать с CRM** (Airtable, Pipedrive и т.д.)

---

✨ **Система готова к использованию!**

Для полной инструкции см. [TELEGRAM_SETUP.md](TELEGRAM_SETUP.md)
