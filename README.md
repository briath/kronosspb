# Kronos SPB

Сайт компании с формой обратной связи. Flask API принимает заявки и отправляет
их в Telegram администраторам и менеджерам.

## Сервисы

- `web` — React/Vite frontend, который отдаёт Nginx в контейнере;
- `api` — Flask API для формы обратной связи;
- `bot` — Telegram-бот в режиме polling.

## Запуск через Docker Compose

Требуются Docker Engine и Docker Compose v2.

1. Создайте локальный файл настроек:

   ```bash
   cp .env.example .env
   ```

   В PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

2. В `.env` заполните:

   - `TELEGRAM_BOT_TOKEN` — токен, полученный у `@BotFather`;
   - `ADMIN_IDS` — JSON-массив Telegram ID получателей, например `[123456789]`;
   - `MANAGER_IDS` — дополнительный JSON-массив ID или `[]`;
   - `VITE_API_URL` — `http://localhost:5000` для локального запуска или
     `https://kronos-spb.ru` для сайта за внешним Nginx.

3. Соберите и запустите проект:

   ```bash
   docker compose up -d --build
   ```

4. Проверьте сервисы:

   ```bash
   docker compose ps
   docker compose logs -f
   curl http://localhost:5000/health
   ```

Сайт будет доступен по `http://localhost:3000`, API — по
`http://localhost:5000`. Оба порта привязаны к `127.0.0.1`; для доступа из
интернета используйте внешний Nginx reverse proxy.

## Обновление и остановка

После изменения кода или `VITE_API_URL` пересоберите контейнеры:

```bash
docker compose up -d --build --force-recreate
```

Остановить проект:

```bash
docker compose down
```

## Переменные окружения

`.env` не хранится в Git. Не добавляйте токены, ID сотрудников или другие
рабочие значения в репозиторий. Шаблон находится в `.env.example`.

`VITE_API_URL` попадает в JavaScript во время сборки и является публичным.
Не помещайте секреты в переменные с префиксом `VITE_`.
