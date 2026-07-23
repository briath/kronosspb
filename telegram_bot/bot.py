import logging
from telegram import Update, Bot
from telegram.ext import Application, ContextTypes, CommandHandler
import os
import json
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# Enable logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Configuration
TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
ADMIN_IDS = json.loads(os.getenv('ADMIN_IDS', '[]'))
MANAGER_IDS = json.loads(os.getenv('MANAGER_IDS', '[]'))

# Combine admin and manager IDs
AUTHORIZED_IDS = ADMIN_IDS + MANAGER_IDS


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /start is issued."""
    user = update.effective_user
    
    message = (
        f"👋 Привет, {user.first_name}!\n\n"
        f"Я бот компании INGENIOUS SYSTEMS.\n\n"
        f"Я буду отправлять вам заявки с сайта.\n\n"
        f"Ваш ID: `{user.id}`\n\n"
        f"_Используйте этот ID для настройки администраторов и менеджеров_"
    )
    
    await update.message.reply_text(message, parse_mode='Markdown')


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /help is issued."""
    help_text = (
        "📋 Доступные команды:\n\n"
        "/start - Начать\n"
        "/help - Справка\n"
        "/myid - Ваш Telegram ID\n\n"
        "Я автоматически отправляю заявки с сайта всем администраторам и менеджерам."
    )
    await update.message.reply_text(help_text)


async def myid(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send user's Telegram ID."""
    user_id = update.effective_user.id
    message = f"Ваш Telegram ID: `{user_id}`"
    await update.message.reply_text(message, parse_mode='Markdown')


async def send_inquiry(chat_id: int, name: str, phone: str, message_text: str, bot_instance) -> bool:
    """
    Send inquiry to specific chat (admin/manager).
    Returns True if successful, False otherwise.
    """
    try:
        formatted_message = (
            "📬 <b>НОВАЯ ЗАЯВКА С САЙТА</b>\n\n"
            f"<b>Имя:</b> {name}\n"
            f"<b>Телефон:</b> {phone}\n"
            f"<b>Сообщение:</b>\n{message_text}\n\n"
            f"<i>Время получения:</i> {datetime.now().strftime('%d.%m.%Y %H:%M:%S')}"
        )
        
        await bot_instance.send_message(
            chat_id=chat_id,
            text=formatted_message,
            parse_mode='HTML'
        )
        return True
    except Exception as e:
        logger.error(f"Failed to send message to {chat_id}: {e}")
        return False


async def send_inquiry_to_admins(name: str, phone: str, message_text: str, app: Application) -> dict:
    """
    Send inquiry to all authorized admins and managers.
    Returns status report.
    """
    bot_instance = app.bot
    results = {
        "total": len(AUTHORIZED_IDS),
        "sent": 0,
        "failed": 0,
        "failed_ids": []
    }
    
    if not AUTHORIZED_IDS:
        logger.warning("No authorized IDs configured!")
        results["failed"] = 1
        return results
    
    for chat_id in AUTHORIZED_IDS:
        success = await send_inquiry(chat_id, name, phone, message_text, bot_instance)
        if success:
            results["sent"] += 1
            logger.info(f"Message sent to {chat_id}")
        else:
            results["failed"] += 1
            results["failed_ids"].append(chat_id)
            logger.error(f"Message failed to send to {chat_id}")
    
    return results


def main() -> None:
    """Start the bot."""
    if not TELEGRAM_BOT_TOKEN:
        raise ValueError("TELEGRAM_BOT_TOKEN не установлен в .env файле")
    
    # Create the Application
    application = Application.builder().token(TELEGRAM_BOT_TOKEN).build()

    # on different commands - answer in Telegram
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("myid", myid))

    # Run the bot
    application.run_polling()


if __name__ == '__main__':
    main()
