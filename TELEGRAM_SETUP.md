# 📚 Полная интеграция Telegram Бота

Этот гайд поможет вам настроить полную интеграцию контактной формы сайта с Telegram ботом.

## 📋 Требования

- **Node.js** 18+ (для фронтенда)
- **Python** 3.8+ (для бота)
- **Telegram аккаунт** (для создания бота)
- **Интернет** (для комбинирования с Telegram API)

## 🎯 Общая архитектура

```
┌─────────────────────────────────────────────────────────────┐
│                    INGENIOUS SYSTEMS WEBSITE                │
│                       (React + Vite)                         │
│                     (http://localhost:3000)                  │
└──────────────────────────┬──────────────────────────────────┘
                           │ POST запрос
                           │ /api/inquiry
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                   API SERVER (Flask)                         │
│                  (http://localhost:5000)                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ api_server.py                                       │   │
│  │ - Обработка POST запросов                           │   │
│  │ - Валидация API key                                 │   │
│  │ - Отправка в Telegram Bot API                       │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────────┘
                           │ Telegram Bot API
                           │ (HTTPS)
                           ↓
                    TELEGRAM SERVERS
                           │
                           ↓
    ┌──────────────────────────────────────────┐
    │    Telegram Bot                          │
    │    Получает команды и информацию        │
    └──────────────────────────────────────────┘
                           │
                ┌──────────┴──────────┐
                ↓                     ↓
            ADMINS              MANAGERS
         (Telegram ID)        (Telegram ID)
```

## 🚀 Пошаговая установка

### Шаг 1: Создание Telegram Бота

1. **Откройте Telegram** и найдите [@BotFather](https://t.me/botfather)

2. **Отправьте команду:**
   ```
   /newbot
   ```

3. **Следуйте инструкциям:**
   - Введите имя бота (например: `INGENIOUS SYSTEMS Bot`)
   - Введите username бота (должен быть уникальным, например: `ingenious_systems_bot`)

4. **Получите BOT_TOKEN:**
   ```
   Congratulations on your new bot. You will find it at 
   t.me/bot_username. 
   You can now add a description, about section 
   and profile picture for your bot, see /help for a list of commands.
   
   Use this token to access the HTTP API:
   123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
   ```
   📌 **Скопируйте токен** - он вам понадобится!

### Шаг 2: Получение Admin и Manager IDs

1. **Найдите свого бота** в Telegram и откройте его

2. **Отправьте команду:**
   ```
   /start
   ```

3. **Затем отправьте:**
   ```
   /myid
   ```

4. **Бот ответит:**
   ```
   Ваш Telegram ID: 123456789
   ```
   📌 **Запомните этот ID** - это ваш Admin/Manager ID

5. **Повторите процесс для всех администраторов и менеджеров**, которых нужно добавить

### Шаг 3: Настройка Telegram Bot

**Папка:** `telegram_bot/`

1. **Скопируйте конфиг файл:**
   ```bash
   cd telegram_bot
   cp .env.example .env
   ```

2. **Отредактируйте `.env` файл:**
   ```env
   TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
   ADMIN_IDS=[123456789, 987654321]
   MANAGER_IDS=[111111111, 222222222]
   API_KEY=my-super-secret-api-key-12345-change-this
   ```

   - **TELEGRAM_BOT_TOKEN** - токен от @BotFather
   - **ADMIN_IDS** - список ID администраторов (JSON array)
   - **MANAGER_IDS** - список ID менеджеров (JSON array)
   - **API_KEY** - используется для защиты API (придумайте сложный ключ)

3. **Установите зависимости:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Запустите API сервер:**
   ```bash
   python api_server.py
   ```
   
   Вы должны увидеть:
   ```
   Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
   ```

### Шаг 4: Настройка Frontend

**Папка:** корень проекта

1. **Скопируйте конфиг файл:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Отредактируйте `.env.local` файл:**
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_API_KEY=my-super-secret-api-key-12345-change-this
   ```

   ⚠️ **ВАЖНО:** `VITE_API_KEY` должен совпадать с `API_KEY` в `telegram_bot/.env`!

### Шаг 5: Запуск всей системы

**Терминал 1 - API Server:**
```bash
cd telegram_bot
python api_server.py
```

**Терминал 2 - Frontend:**
```bash
npm run dev
```

Откройте в браузере: http://localhost:3000

## ✅ Проверка работоспособности

### 1. Проверьте здоровье API сервера

```bash
curl http://localhost:5000/health
```

Ответ:
```json
{
  "status": "ok",
  "bot_initialized": true,
  "authorized_ids_count": 2
}
```

### 2. Проверьте статус бота

```bash
curl -H "X-API-Key: my-super-secret-api-key-12345-change-this" \
  http://localhost:5000/api/status
```

### 3. Отправьте тестовую заявку

```bash
curl -X POST http://localhost:5000/api/inquiry \
  -H "Content-Type: application/json" \
  -H "X-API-Key: my-super-secret-api-key-12345-change-this" \
  -d '{
    "name": "Тест",
    "phone": "+7 (921) 123-45-67",
    "message": "Это тестовое сообщение"
  }'
```

Вы должны получить сообщение в Telegram от вашего бота!

### 4. Тестируйте через сайт

1. Откройте http://localhost:3000
2. Перейдите на страницу "Контакты"
3. Заполните форму "Быстрая заявка"
4. Нажмите "Отправить запрос"
5. Проверьте Telegram - должно придти сообщение

## 📱 Что вы получите в Telegram

Когда кто-то заполнит форму на сайте, вы получите сообщение:

```
📬 НОВАЯ ЗАЯВКА С САЙТА

Имя: Иван Иванов
Телефон: +7 (921) 123-45-67
Сообщение:
Мне нужна система умного дома в квартиру на 100м2

Время получения: 21.03.2026 14:30:45
```

## 🔐 Production развертывание

### На Linux сервере (Ubuntu/Debian)

**1. Установите зависимости:**
```bash
sudo apt-get update
sudo apt-get install python3-pip python3-venv
```

**2. Создайте виртуальное окружение:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**3. Установите пакеты:**
```bash
pip install -r requirements.txt
pip install gunicorn
```

**4. Создайте systemd сервис `telegram_api.service`:**
```bash
sudo nano /etc/systemd/system/telegram_api.service
```

Содержимое:
```ini
[Unit]
Description=INGENIOUS SYSTEMS Telegram API
After=network.target

[Service]
Type=notify
User=www-data
WorkingDirectory=/path/to/project/telegram_bot
Environment="PATH=/path/to/project/telegram_bot/venv/bin"
ExecStart=/path/to/project/telegram_bot/venv/bin/gunicorn \
  -w 4 \
  -b 127.0.0.1:5000 \
  --timeout 30 \
  api_server:app

Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

**5. Запустите сервис:**
```bash
sudo systemctl daemon-reload
sudo systemctl enable telegram_api
sudo systemctl start telegram_api
sudo systemctl status telegram_api
```

**6. Настройте Nginx как reverse proxy:**
```nginx
upstream telegram_api {
    server 127.0.0.1:5000;
}

server {
    listen 80;
    server_name api.ingenious-systems.ru;

    location /api/ {
        proxy_pass http://telegram_api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /health {
        proxy_pass http://telegram_api;
    }
}
```

**7. Обновите `.env.local` в frontend:**
```env
VITE_API_URL=https://api.ingenious-systems.ru
VITE_API_KEY=your-secret-key
```

## 🐛 Troubleshooting

### Проблема: "Invalid API key"

**Решение:**
- Проверьте, что `VITE_API_KEY` в `.env.local` совпадает с `API_KEY` в `telegram_bot/.env`
- Очистите браузер кэш (F12 → Application → Clear Storage)

### Проблема: "Failed to send inquiry"

**Решение:**
1. Проверьте, что все админы/менеджеры написали боту `/start`
2. Убедитесь, что IDs правильно указаны в `.env`
3. Проверьте логи: `python api_server.py`

### Проблема: Боoted не инициализируется

**Решение:**
1. Проверьте, что токен правильный: `echo $TELEGRAM_BOT_TOKEN`
2. Переустановите зависимости: `pip install -r requirements.txt --force-reinstall`

### Проблема: CORS ошибка

**Решение:**
- Убедитесь, что API сервер запущен с CORS поддержкой
- Проверьте `flask_cors` в requirements.txt

## 📞 Команды Telegram бота

Вот команды, которые доступны в боте:

- `/start` - Инициировать бота и получить информацию
- `/help` - Справка по командам
- `/myid` - Ваш Telegram ID (используйте для добавления себя в админы)

## 📊 Мониторинг

### Просмотр логов API сервера

```bash
tail -f /var/log/telegram_api.log
```

### Проверка статуса в production

```bash
curl https://api.ingenious-systems.ru/health
```

## 🔄 Обновление конфигурации

Если вы добавили новых администраторов:

1. Отредактируйте `telegram_bot/.env`
2. Выполните команду:
   ```bash
   systemctl restart telegram_api
   ```

## 📚 Дополнительные ресурсы

- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [Python Telegram Bot Library](https://python-telegram-bot.readthedocs.io/)
- [Flask Documentation](https://flask.palletsprojects.com/)

## 🎓 FAQ

**Q: Можно ли использовать другой язык программирования?**
A: Да! Вместо Python можно использовать Node.js, Go, Java и т.д. Главное - реализовать REST API endpoint.

**Q: Где хранятся сообщения?**
A: Сообщения хранятся на серверах Telegram. Мы их только отправляем.

**Q: Какова частота лимитов от Telegram?**
A: Telegram API имеет rate limit примерно 30 сообщений в секунду для одного чата.

**Q: Как добавить больше админов?**
A: Получите их Telegram ID (они должны написать боту `/myid`) и добавьте в `ADMIN_IDS` в `.env`.

---

✅ **С этого момента все заявки с контактной формы будут приходить вам в Telegram!**
