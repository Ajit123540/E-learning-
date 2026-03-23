#!/bin/bash

# E-Learning Platform Setup Script
# This script sets up the entire e-learning platform for development

echo "🚀 Setting up E-Learning Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v14 or higher) first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="14.0.0"

if ! node -e "process.exit(require('semver').gte('$NODE_VERSION', '$REQUIRED_VERSION') ? 0 : 1)" 2>/dev/null; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please install v14 or higher."
    exit 1
fi

echo "✅ Node.js version $NODE_VERSION detected"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd lms/frontend
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd ../backend
npm install

# Create environment file for backend
if [ ! -f .env ]; then
    echo "🔧 Creating backend environment file..."
    cat > .env << EOL
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
EOL
    echo "⚠️  Please update the JWT_SECRET in lms/backend/.env before production use"
fi

# Create database file if it doesn't exist
if [ ! -f db.json ]; then
    echo "🗄️ Creating database file..."
    cat > db.json << EOL
{
  "users": [],
  "courses": []
}
EOL
fi

cd ../..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update JWT_SECRET in lms/backend/.env for production"
echo "2. Run 'npm start' to start both frontend and backend servers"
echo "3. Frontend: http://localhost:3000"
echo "4. Backend:  http://localhost:5000"
echo ""
echo "📚 Additional commands:"
echo "- npm run start:frontend - Start only frontend"
echo "- npm run start:backend  - Start only backend"
echo "- npm run build         - Build for production"
echo ""
echo "🎯 Happy coding!"
