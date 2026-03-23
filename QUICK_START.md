# 🚀 Quick Start Guide

## 📋 Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

## ⚡ Quick Setup

### Option 1: Automatic Setup (Recommended)

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

1. **Install all dependencies:**
```bash
npm run install-all
```

2. **Start both servers:**
```bash
npm start
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Documentation**: http://localhost:5000

## 🔧 Environment Setup

Create `lms/backend/.env` file:
```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

## 📱 Features Available

### Authentication
- ✅ User Registration
- ✅ User Login
- ✅ Forgot Password
- ✅ Reset Password

### Course Management
- ✅ Browse Courses
- ✅ Course Details
- ✅ Professional UI Theme

### UI/UX
- ✅ Professional Design
- ✅ Responsive Layout
- ✅ Modern Components
- ✅ Smooth Animations

## 🛠 Development Commands

```bash
# Start both servers
npm start

# Start only frontend
npm run start:frontend

# Start only backend
npm run start:backend

# Build for production
npm run build

# Install all dependencies
npm run install-all
```

## 🎯 Default Features

### Sample Courses
The platform comes with pre-configured sample courses including:
- Web Development Bootcamp
- React Masterclass
- JavaScript Programming
- Advanced JavaScript Programming

### Sample Users
You can register new users or use the authentication system to create accounts.

## 📞 Support

For issues and questions:
1. Check the main README.md
2. Create an issue on GitHub
3. Review the documentation

---

**Ready to start learning! 🎓**
