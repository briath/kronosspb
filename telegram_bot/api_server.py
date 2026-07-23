import asyncio
import json
import logging
import os
from datetime import datetime
from html import escape

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from telegram import Bot
from telegram.error import TelegramError

load_dotenv()

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",
            "https://kronos-spb.ru",
            "https://www.kronos-spb.ru",
        ]
    }
})

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
ADMIN_IDS = json.loads(os.getenv("ADMIN_IDS", "[]"))
MANAGER_IDS = json.loads(os.getenv("MANAGER_IDS", "[]"))
AUTHORIZED_IDS = ADMIN_IDS + MANAGER_IDS

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    bot = Bot(token=TELEGRAM_BOT_TOKEN) if TELEGRAM_BOT_TOKEN else None
except Exception as error:
    logger.error("Failed to initialize Telegram bot: %s", error)
    bot = None


def format_inquiry_message(name: str, phone: str, message: str) -> str:
    return (
        "📬 <b>НОВАЯ ЗАЯВКА С САЙТА</b>\n\n"
        f"<b>Имя:</b> {escape(name)}\n"
        f"<b>Телефон:</b> {escape(phone)}\n"
        f"<b>Сообщение:</b>\n{escape(message)}\n\n"
        f"<i>Время получения:</i> {datetime.now().strftime('%d.%m.%Y %H:%M:%S')}"
    )


async def send_message(chat_id: int, text: str) -> tuple[int, bool]:
    try:
        await bot.send_message(chat_id=chat_id, text=text, parse_mode="HTML")
        return chat_id, True
    except TelegramError as error:
        logger.error("Failed to send message to %s: %s", chat_id, error)
        return chat_id, False


async def send_to_all_recipients(text: str) -> list[tuple[int, bool]]:
    return await asyncio.gather(*(send_message(chat_id, text) for chat_id in AUTHORIZED_IDS))


@app.post("/api/inquiry")
def submit_inquiry():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "error": "Invalid JSON"}), 400

    name = str(data.get("name", "")).strip()
    phone = str(data.get("phone", "")).strip()
    message = str(data.get("message", "")).strip()

    if not name or not phone or not message:
        return jsonify({
            "success": False,
            "error": "Missing required fields: name, phone, message"
        }), 400

    if len(name) > 100 or len(phone) > 50 or len(message) > 2000:
        return jsonify({"success": False, "error": "Input exceeds the maximum allowed length"}), 400

    if not bot:
        logger.error("Bot is not initialized")
        return jsonify({"success": False, "error": "Bot service temporarily unavailable"}), 503

    if not AUTHORIZED_IDS:
        logger.error("No authorized Telegram recipients configured")
        return jsonify({"success": False, "error": "No recipients configured"}), 503

    text = format_inquiry_message(name, phone, message)
    results = asyncio.run(send_to_all_recipients(text))
    sent_count = sum(success for _, success in results)

    if sent_count:
        return jsonify({"success": True, "message": "Inquiry sent successfully"}), 200

    return jsonify({"success": False, "error": "Failed to deliver inquiry"}), 503


@app.get("/health")
def health_check():
    return jsonify({"status": "ok"}), 200


@app.errorhandler(404)
def not_found(_error):
    return jsonify({"error": "Endpoint not found"}), 404


@app.errorhandler(500)
def internal_error(_error):
    return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
