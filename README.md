# 📚 E-Learning Platform

A modern, professional e-learning platform built with React and Node.js, featuring user authentication, course management, and a beautiful UI/UX design.

## 🚀 Features

### 🎓 Core Features
- **User Authentication**: Login, Register, Forgot Password functionality
- **Course Management**: Browse courses, view detailed information
- **Professional UI/UX**: Modern, clean design with professional theme
- **Responsive Design**: Works seamlessly on all devices
- **Progress Tracking**: Track learning progress and achievements
- **🏆 RPG Gamification**: Gain XP, level up, and unlock Gamer Cards on your Student Dashboard.
- **🖌️ Interactive Whiteboard**: Draw formulas and diagram concepts directly on the Course Video page using HTML5 Canvas.
- **🤖 AI Course Tutor**: Dynamic, real-time simulated AI assistance while you learn.
- **📈 Advanced E-Commerce**: Dedicated Analytics Dashboard, Promo Code engines, and native PDF Certificate generation!

### 🛠 Technical Features
- **Frontend**: React.js with Material-UI components
- **Backend**: Node.js with Express.js
- **Database**: JSON file-based storage (easily migratable to MongoDB)
- **Authentication**: JWT-based secure authentication
- **Password Reset**: Secure token-based password recovery
- **Professional Theme**: Clean, modern blue color scheme

## 📁 Project Structure

```
E-learning-/
├── lms/
│   ├── frontend/                 # React.js Frontend
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/       # Reusable components
│   │   │   │   ├── Layout.js
│   │   │   │   ├── EnhancedCourseCard.js
│   │   │   │   ├── ProgressTracker.js
│   │   │   │   └── ...
│   │   │   ├── pages/           # Page components
│   │   │   │   ├── auth/
│   │   │   │   │   ├── LoginPage.js
│   │   │   │   │   ├── RegisterPage.js
│   │   │   │   │   ├── ForgotPasswordPage.js
│   │   │   │   │   └── ResetPasswordPage.js
│   │   │   │   ├── home/
│   │   │   │   │   └── HomePage.js
│   │   │   │   └── courses/
│   │   │   │       └── CourseDetailPage.js
│   │   │   ├── store/           # State management
│   │   │   │   └── AuthContext.js
│   │   │   ├── App.js
│   │   │   └── index.js
│   │   └── package.json
│   └── backend/                 # Node.js Backend
│       ├── models/
│       │   └── Course.js
│       ├── routes/
│       │   └── auth.js
│       ├── middleware/
│       │   └── auth.js
│       ├── server.js
│       ├── db.json              # JSON database file
│       ├── .env                 # Environment variables
│       └── package.json
├── README.md
└── .gitignore
```

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd lms/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
```

Backend will run on: `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd lms/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend server:
```bash
npm start
```

Frontend will run on: `http://localhost:3000`

## 🎨 UI/UX Design

### Professional Theme
- **Primary Color**: Professional Blue (#2563eb)
- **Background**: Clean white/light gray (#ffffff, #f8f9fa)
- **Typography**: Clear hierarchy with modern fonts
- **Components**: Material-UI with custom styling
- **Shadows**: Subtle, professional elevation effects

### Design Features
- **Responsive Layout**: Mobile-first approach
- **Modern Cards**: Clean course cards with hover effects
- **Professional Forms**: Styled input fields and buttons
- **Smooth Animations**: Subtle transitions and micro-interactions
- **Consistent Branding**: Unified color scheme throughout

## 📱 Pages & Components

### Authentication Pages
- **Login Page**: Professional login with remember me option
- **Register Page**: User registration with form validation
- **Forgot Password**: Email-based password reset
- **Reset Password**: Secure password reset with token validation

### Main Pages
- **Home Page**: Course listings, features, and call-to-action
- **Course Detail Page**: Detailed course information and enrollment
- **Dashboard**: User dashboard (protected route)

### Key Components
- **EnhancedCourseCard**: Professional course display cards
- **Layout**: Main application layout with navigation
- **ProgressTracker**: Course progress visualization
- **AuthContext**: Authentication state management

## 🔐 Authentication Features

### Secure Login/Registration
- Email and password authentication
- JWT token-based session management
- Protected routes with authentication guards
- Form validation and error handling

### Password Reset Flow
1. User requests password reset via email
2. Backend generates secure reset token (1-hour expiry)
3. Token is sent to user (development: displayed directly)
4. User sets new password with token validation
5. Auto-redirect to login after successful reset

## 🗄 Database Schema

### Users Collection
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "password": "hashed_string",
  "role": "student|instructor",
  "enrolledCourses": ["course_id"],
  "createdAt": "timestamp",
  "resetToken": "string (optional)",
  "resetTokenExpiry": "timestamp (optional)"
}
```

### Courses Collection
```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "instructor": "string",
  "category": "string",
  "rating": "number",
  "students": "number",
  "duration": "string",
  "lectures": "number",
  "level": "string",
  "price": "number",
  "isPaid": "boolean",
  "image": "string",
  "icon": "string",
  "whatYouLearn": ["string"],
  "instructorBio": "string",
  "certificateType": "free|paid|premium",
  "certificatePrice": "number"
}
```

## 🚀 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get user data (protected)
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Course Routes
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get specific course details

## 🎯 Key Features Implementation

### Professional Theme Implementation
- Clean, modern color palette
- Consistent spacing and typography
- Professional form styling
- Smooth hover effects and transitions
- Mobile-responsive design

### Security Features
- Password hashing with bcryptjs
- JWT token authentication
- Input validation and sanitization
- CORS configuration
- Environment variable management

### User Experience
- Loading states and error handling
- Form validation feedback
- Intuitive navigation
- Professional animations
- Accessibility considerations

## 🔧 Development Notes

### Environment Variables
Create `.env` file in backend directory:
```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

### Database Migration
The current implementation uses a JSON file for simplicity. To migrate to MongoDB:
1. Install MongoDB driver: `npm install mongoose`
2. Update database connection in `server.js`
3. Modify routes to use Mongoose models
4. Update data structures accordingly

### Production Deployment
1. Set production environment variables
2. Build frontend: `npm run build`
3. Configure production database
4. Set up reverse proxy (nginx)
5. Configure SSL certificates
6. Deploy to hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Material-UI for React components
- React Router for navigation
- Axios for HTTP requests
- bcryptjs for password hashing
- jsonwebtoken for authentication
- LowDB for JSON database

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for the education community**
