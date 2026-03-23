@echo off
REM E-Learning Platform Setup Script for Windows
REM This script sets up the entire e-learning platform for development

echo 🚀 Setting up E-Learning Platform...

REM Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js (v14 or higher) first.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected

REM Install root dependencies
echo 📦 Installing root dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install root dependencies
    pause
    exit /b 1
)

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd lms\frontend
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd ..\backend
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

REM Create environment file for backend
if not exist .env (
    echo 🔧 Creating backend environment file...
    (
        echo PORT=5000
        echo JWT_SECRET=your_jwt_secret_key_change_this_in_production
        echo NODE_ENV=development
    ) > .env
    echo ⚠️ Please update the JWT_SECRET in lms\backend\.env before production use
)

REM Create database file if it doesn't exist
if not exist db.json (
    echo 🗄️ Creating database file...
    (
        echo {
        echo   "users": [],
        echo   "courses": []
        echo }
    ) > db.json
)

cd ..\..

echo.
echo 🎉 Setup complete!
echo.
echo 📋 Next steps:
echo 1. Update JWT_SECRET in lms\backend\.env for production
echo 2. Run 'npm start' to start both frontend and backend servers
echo 3. Frontend: http://localhost:3000
echo 4. Backend:  http://localhost:5000
echo.
echo 📚 Additional commands:
echo - npm run start:frontend - Start only frontend
echo - npm run start:backend  - Start only backend
echo - npm run build         - Build for production
echo.
echo 🎯 Happy coding!
pause
