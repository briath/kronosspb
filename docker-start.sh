#!/bin/bash

# Docker startup script for INGENIOUS SYSTEMS
# For Linux/macOS

set -e

echo ""
echo "========================================"
echo " INGENIOUS SYSTEMS - Docker Startup"
echo "========================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed"
    echo "📖 Please install Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

echo "✅ Docker found!"

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    echo "❌ Error: Docker daemon is not running"
    echo "📖 Please start Docker daemon"
    exit 1
fi

echo "✅ Docker daemon is running!"
echo ""

# Display menu
echo "Choose action:"
echo "  1. Start all services (up -d)"
echo "  2. Start with logs (up)"
echo "  3. Stop all services (down)"
echo "  4. View logs"
echo "  5. View API status"
echo "  6. Rebuild and start"
echo "  7. Clean up everything (down -v)"
echo "  0. Exit"
echo ""

read -p "Enter your choice (0-7): " choice

case "$choice" in
    1)
        echo "Starting services..."
        docker-compose up -d
        echo ""
        echo "✅ Services started!"
        echo "🌐 Web: http://localhost:3000"
        echo "🔌 API: http://localhost:5000"
        ;;
    2)
        echo "Starting services with logs..."
        docker-compose up
        ;;
    3)
        echo "Stopping services..."
        docker-compose stop
        echo "✅ Done!"
        ;;
    4)
        docker-compose logs -f
        ;;
    5)
        echo "Checking API status..."
        docker-compose exec api curl http://localhost:5000/health
        ;;
    6)
        echo "Rebuilding and starting..."
        docker-compose up -d --build
        echo "✅ Done!"
        ;;
    7)
        echo "Cleaning up everything..."
        docker-compose down -v
        echo "✅ Done!"
        ;;
    0)
        echo "Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice!"
        exit 1
        ;;
esac

echo ""
