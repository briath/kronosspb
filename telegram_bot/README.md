# Telegram Bot for INGENIOUS SYSTEMS

Этот чат-бот автоматически отправляет заявки с сайта в Telegram администраторам и менеджерам.

## 🚀 Быстрый старт

### 1. Создание Telegram бота

1. Откройте диалог с [@BotFather](https://t.me/botfather) в Telegram
2. Отправьте команду `/newbot`
3. Следуйте инструкциям для создания бота
4. Получите **BOT_TOKEN** - скопируйте его

### 2. Получение Admin/Manager IDs

1. Найдите бота в Telegram (поищите по имени)
2. Нажмите `/start`
3. Нажмите `/myid` - получите свой ID
4. Повторите для всех админов и менеджеров

### 3. Установка зависимостей

```bash
cd telegram_bot
pip install -r requirements.txt
```

### 4. Конфигурация

1. Скопируйте `.env.example` в `.env`:
```bash
cp .env.example .env
```

2. Отредактируйте `.env` и заполните:
```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
ADMIN_IDS=[123456789, 987654321]
MANAGER_IDS=[111111111, 222222222]
API_KEY=your-secure-api-key-here
```

### 5. Запуск API сервера

```bash
python api_server.py
```

Сервер запустится на `http://localhost:5000`

### 6. Проверка здоровья системы

```bash
curl http://localhost:5000/health
```

## 📝 Использование

### Отправка заявки с сайта

После заполнения формы сайт отправляет POST запрос на сервер:

```javascript
const response = await fetch('http://localhost:5000/api/inquiry', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key'
  },
  body: JSON.stringify({
    name: 'Иван Иванов',
    phone: '+7 (921) 183-11-92',
    message: 'Мне нужен умный дом'
  })
});
```

### Проверка статуса

```bash
curl -H "X-API-Key: your-api-key" http://localhost:5000/api/status
```

## 🏗️ Архитектура

```
Frontend (React)
      ↓ POST запрос
   API Server (Flask)
      ↓ Использует Telegram Bot API
   Telegram Bot
      ↓
   Admin/Manager IDs
      ↓
   Telegram Чат
```

## 📁 Файлы

- **api_server.py** - Flask API сервер для обработки заявок
- **bot.py** - Основной бот (для polling режима)
- **.env.example** - Пример конфигурации
- **requirements.txt** - Python зависимости
- **README.md** - Этот файл

## ⚙️ Переменные окружения

| Переменная | Описание | Пример |
|-----------|---------|--------|
| `TELEGRAM_BOT_TOKEN` | Токен бота от @BotFather | `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11` |
| `ADMIN_IDS` | JSON массив ID админов | `[123456789, 987654321]` |
| `MANAGER_IDS` | JSON массив ID менеджеров | `[111111111, 222222222]` |
| `API_KEY` | Ключ для защиты API | `my-super-secret-key-123` |

## 🔒 Безопасность

- Используйте **API_KEY** для защиты endpoint-а
- Никогда не коммитьте `.env` файл
- Используйте сильные API ключи
- Передавайте API key в header `X-API-Key`, не в body

## 📦 Production развертывание

Для production используйте:

```bash
# Используйте gunicorn
pip install gunicorn

# Запустите с несколькими workers
gunicorn -w 4 -b 0.0.0.0:5000 api_server:app
```

## 🐛 Troubleshooting

### Бот не отправляет сообщения

1. Проверьте, что бот основан на своем боте (@BotFather)
2. Убедитесь, что админы/менеджеры написали боту `/start`
3. Проверьте IDs в `.env` файле

### API сервер не запускается

1. Проверьте версию Python (нужна 3.8+)
2. Переустановите зависимости: `pip install -r requirements.txt --force-reinstall`
3. Убедитесь, что порт 5000 не занят

### Ошибка "Invalid API key"

Убедитесь, что вы передаете правильный API ключ в header `X-API-Key`

## 📞 API Endpoints

### POST /api/inquiry
Отправить заявку

**Headers:**
```
X-API-Key: your-api-key
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Иван Иванов",
  "phone": "+7 (921) 183-11-92",
  "message": "Текст сообщения"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Inquiry sent successfully",
  "details": {
    "total": 2,
    "sent": 2,
    "failed": 0,
    "failed_ids": []
  }
}
```

### GET /health
Проверка здоровья сервера

**Response:**
```json
{
  "status": "ok",
  "bot_initialized": true,
  "authorized_ids_count": 2
}
```

### GET /api/status
Получить статус бота (требует API key)

**Headers:**
```
X-API-Key: your-api-key
```

**Response:**
```json
{
  "bot_token_configured": true,
  "authorized_ids_count": 2,
  "admin_ids": 2,
  "manager_ids": 0
}
```

## 📄 Лицензия

Этот проект является частью INGENIOUS SYSTEMS
