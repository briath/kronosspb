# Docker и контейнеризация
## Команды для запуска:

### С использованием Docker Compose (рекомендуется)
\`\`\`bash
docker-compose up -d
\`\`\`

Приложение будет доступно на: http://localhost:3000

### Или собрать и запустить вручную

**1. Собрать образ:**
\`\`\`bash
docker build -t ingenious-systems .
\`\`\`

**2. Запустить контейнер:**
\`\`\`bash
docker run -d -p 3000:80 --name ingenious-systems ingenious-systems
\`\`\`

### Полезные команды

**Остановить контейнер:**
\`\`\`bash
docker-compose down
# или
docker stop ingenious-systems
\`\`\`

**Просмотр логов:**
\`\`\`bash
docker-compose logs -f
# или
docker logs ingenious-systems
\`\`\`

**Удалить образ:**
\`\`\`bash
docker rmi ingenious-systems
\`\`\`

### Структура Docker конфигурации

- **Dockerfile** - Многоэтапная сборка:
  - Stage 1 (Builder): Node.js 20 Alpine компилирует React приложение
  - Stage 2 (Production): Nginx Alpine сервирует собранные файлы

- **nginx.conf** - Конфигурация Nginx:
  - SPA routing (все запросы направляются на index.html)
  - Gzip сжатие
  - Кеширование статических assets на 30 дней
  - Безопасность (блокировка скрытых файлов)

- **docker-compose.yml** - Оркестрация:
  - Автоматическая сборка образа
  - Маппинг портов (3000:80)
  - Health check для мониторинга
  - Auto-restart политика

### Размер образа

Благодаря многоэтапной сборке и Alpine образам, финальный размер примерно **20-30MB**.
