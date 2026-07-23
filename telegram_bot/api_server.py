from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from telegram import Bot
from telegram.error import TelegramError
import os
import json
from datetime import datetime
from dotenv import load_dotenv
import asyncio

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for requests from frontend

# Configuration
TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
ADMIN_IDS = json.loads(os.getenv('ADMIN_IDS', '[]'))
MANAGER_IDS = json.loads(os.getenv('MANAGER_IDS', '[]'))
AUTHORIZED_IDS = ADMIN_IDS + MANAGER_IDS
API_KEY = os.getenv('API_KEY', 'your-secret-key-change-this')

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Telegram bot
try:
    bot = Bot(token=TELEGRAM_BOT_TOKEN)
except Exception as e:
    logger.error(f"Failed to initialize bot: {e}")
    bot = None


def verify_api_key(request_api_key: str) -> bool:
    """Verify API key for security."""
    return request_api_key == API_KEY


def get_authorized_ids() -> list:
    """Get list of authorized chat IDs."""
    return AUTHORIZED_IDS


def format_inquiry_message(name: str, phone: str, message_text: str) -> str:
    """Format inquiry message for Telegram."""
    return (
        "📬 <b>НОВАЯ ЗАЯВКА С САЙТА</b>\n\n"
        f"<b>Имя:</b> {name}\n"
        f"<b>Телефон:</b> {phone}\n"
        f"<b>Сообщение:</b>\n{message_text}\n\n"
        f"<i>Время получения:</i> {datetime.now().strftime('%d.%m.%Y %H:%M:%S')}"
    )


async def send_message_to_user(chat_id: int, formatted_message: str) -> tuple:
    """Send message to user asynchronously."""
    try:
        await bot.send_message(
            chat_id=chat_id,
            text=formatted_message,
            parse_mode='HTML'
        )
        logger.info(f"Message sent to {chat_id}")
        return (chat_id, True, None)
    except TelegramError as e:
        logger.error(f"Failed to send message to {chat_id}: {e}")
        return (chat_id, False, str(e))


@app.route('/api/inquiry', methods=['POST'])
def submit_inquiry():
    """
    Receive inquiry from website form and send to admins/managers.
    
    Expected JSON:
    {
        "name": "Иван Иванов",
        "phone": "+7 (921) 123-45-67",
        "message": "Текст сообщения",
        "api_key": "your-api-key"
    }
    """
    try:
        # Get API key from request
        api_key = request.headers.get('X-API-Key') or request.json.get('api_key')
        
        if not verify_api_key(api_key):
            logger.warning(f"Invalid API key attempt from {request.remote_addr}")
            return jsonify({'success': False, 'error': 'Invalid API key'}), 401
        
        # Parse request data
        data = request.get_json()
        name = data.get('name', '').strip()
        phone = data.get('phone', '').strip()
        message_text = data.get('message', '').strip()
        
        # Validate input
        if not name or not phone or not message_text:
            return jsonify({
                'success': False,
                'error': 'Missing required fields: name, phone, message'
            }), 400
        
        # Check if bot is initialized
        if not bot:
            logger.error("Bot not initialized")
            return jsonify({
                'success': False,
                'error': 'Bot service temporarily unavailable'
            }), 503
        
        # Check if there are authorized recipients
        authorized_ids = get_authorized_ids()
        if not authorized_ids:
            logger.error("No authorized IDs configured")
            return jsonify({
                'success': False,
                'error': 'No authorized recipients configured'
            }), 500
        
        # Format message
        formatted_message = format_inquiry_message(name, phone, message_text)
        
        # Send message to all authorized users
        results = {
            'total': len(authorized_ids),
            'sent': 0,
            'failed': 0,
            'failed_ids': []
        }
        
        # Create tasks for all users
        async def send_all_messages():
            tasks = [send_message_to_user(chat_id, formatted_message) for chat_id in authorized_ids]
            return await asyncio.gather(*tasks)
        
        # Execute async tasks
        try:
            send_results = asyncio.run(send_all_messages())
            for chat_id, success, error in send_results:
                if success:
                    results['sent'] += 1
                else:
                    results['failed'] += 1
                    results['failed_ids'].append(chat_id)
        except Exception as e:
            logger.error(f"Error sending messages: {e}")
        
        # Return success even if some messages failed
        if results['sent'] > 0:
            return jsonify({
                'success': True,
                'message': 'Inquiry sent successfully',
                'details': results
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': 'Failed to send inquiry to any recipient',
                'details': results
            }), 503
        
    except json.JSONDecodeError:
        return jsonify({'success': False, 'error': 'Invalid JSON'}), 400
    except Exception as e:
        logger.error(f"Error processing inquiry: {e}")
        return jsonify({
            'success': False,
            'error': 'Internal server error',
            'details': str(e)
        }), 500


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'ok',
        'bot_initialized': bot is not None,
        'authorized_ids_count': len(AUTHORIZED_IDS)
    }), 200


@app.route('/api/status', methods=['GET'])
def get_status():
    """Get bot status (requires API key)."""
    api_key = request.headers.get('X-API-Key')
    
    if not verify_api_key(api_key):
        return jsonify({'success': False, 'error': 'Invalid API key'}), 401
    
    return jsonify({
        'bot_token_configured': bool(TELEGRAM_BOT_TOKEN),
        'authorized_ids_count': len(AUTHORIZED_IDS),
        'admin_ids': len(ADMIN_IDS),
        'manager_ids': len(MANAGER_IDS)
    }), 200


@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    if not TELEGRAM_BOT_TOKEN:
        logger.error("TELEGRAM_BOT_TOKEN не установлен в .env файле")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
