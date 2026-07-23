#!/bin/bash
# Quick setup script for Telegram Bot integration

echo "🤖 INGENIOUS SYSTEMS - Telegram Bot Setup"
echo "=========================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 не установлен. Пожалуйста, установите Python 3.8 или выше."
    exit 1
fi

echo "✅ Python найден"

# Create telegam_bot .env file
if [ ! -f "telegram_bot/.env" ]; then
    echo ""
    echo "📝 Создание конфиг файла для бота..."
    cp telegram_bot/.env.example telegram_bot/.env
    echo "✅ Создан: telegram_bot/.env"
    echo "   ⚠️  Отредактируйте этот файл и добавьте:"
    echo "   - TELEGRAM_BOT_TOKEN (от @BotFather)"
    echo "   - ADMIN_IDS (ваши Telegram ID)"
    echo "   - API_KEY (сложный пароль)"
else
    echo "✅ Найден: telegram_bot/.env"
fi

# Create frontend .env.local file
if [ ! -f ".env.local" ]; then
    echo ""
    echo "📝 Создание конфиг файла для фронтенда..."
    cp .env.local.example .env.local
    echo "✅ Создан: .env.local"
    echo "   ⚠️  Используйте тот же API_KEY что и в telegram_bot/.env"
else
    echo "✅ Найден: .env.local"
fi

echo ""
echo "🎯 Следующие шаги:"
echo ""
echo "1️⃣  Отредактируйте конфиг файлы:"
echo "   telegram_bot/.env - добавьте BOT_TOKEN и IDs"
echo "   .env.local - убедитесь что API_KEY совпадает"
echo ""
echo "2️⃣  Установите Python зависимости:"
echo "   cd telegram_bot"
echo "   pip install -r requirements.txt"
echo "   cd .."
echo ""
echo "3️⃣  Запустите API сервер в отдельном терминале:"
echo "   cd telegram_bot"
echo "   python api_server.py"
echo ""
echo "4️⃣  Запустите фронтенд в другом терминале:"
echo "   npm run dev"
echo ""
echo "5️⃣  Откройте в браузере:"
echo "   http://localhost:3000"
echo ""
echo "📚 Полная инструкция в: TELEGRAM_SETUP.md"
echo ""
