@echo off
REM Docker startup script for INGENIOUS SYSTEMS
REM For Windows PowerShell/CMD

echo.
echo ========================================
echo  INGENIOUS SYSTEMS - Docker Startup
echo ========================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo Error: Docker is not installed or not in PATH
    echo Please install Docker Desktop: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo Docker found!
echo.

REM Check if Docker daemon is running
docker info >nul 2>&1
if errorlevel 1 (
    echo Error: Docker daemon is not running
    echo Please start Docker Desktop
    pause
    exit /b 1
)

echo Docker daemon is running!
echo.

REM Display menu
echo Choose action:
echo 1. Start all services ^ (up -d^)
echo 2. Start with logs ^ (up^)
echo 3. Stop all services ^ (down^)
echo 4. View logs
echo 5. View API status
echo 6. Rebuild and start
echo 7. Clean up everything ^ (down -v^)
echo 0. Exit
echo.

set /p choice="Enter your choice (0-7): "

if "%choice%"=="1" (
    echo Starting services...
    docker-compose up -d
    echo.
    echo Services started!
    echo Web: http://localhost:3000
    echo API: http://localhost:5000
) else if "%choice%"=="2" (
    echo Starting services with logs...
    docker-compose up
) else if "%choice%"=="3" (
    echo Stopping services...
    docker-compose stop
    echo Done!
) else if "%choice%"=="4" (
    docker-compose logs -f
) else if "%choice%"=="5" (
    echo Checking API status...
    docker-compose exec api curl http://localhost:5000/health
) else if "%choice%"=="6" (
    echo Rebuilding and starting...
    docker-compose up -d --build
    echo Done!
) else if "%choice%"=="7" (
    echo Cleaning up everything...
    docker-compose down -v
    echo Done!
) else if "%choice%"=="0" (
    echo Goodbye!
    exit /b 0
) else (
    echo Invalid choice!
    exit /b 1
)

pause
