# 📚 API Documentation

## 🔗 Base URL
```
Development: http://localhost:5000
Production:  https://your-domain.com
```

## 🔐 Authentication

### JWT Token Authentication
- Include JWT token in Authorization header for protected routes
- Format: `Authorization: Bearer <token>`
- Token expires in 7 days

## 📋 API Endpoints

### Authentication Routes

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student" // optional, defaults to "student"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-string",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

**Error Responses:**
- `400 Bad Request`: User already exists or validation error
- `500 Internal Server Error`: Server error

---

#### POST /api/auth/login
Authenticate user and return JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-string",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Invalid credentials
- `500 Internal Server Error`: Server error

---

#### GET /api/auth/user
Get current user information (protected route).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
{
  "id": "uuid-string",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "student",
  "enrolledCourses": ["course-id-1", "course-id-2"],
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or missing token
- `404 Not Found`: User not found
- `500 Internal Server Error`: Server error

---

#### POST /api/auth/forgot-password
Request password reset token.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response (200 OK):**
```json
{
  "message": "Password reset token generated",
  "resetToken": "uuid-reset-token", // Remove in production
  "expiresIn": "1 hour"
}
```

**Error Responses:**
- `404 Not Found`: User not found
- `500 Internal Server Error`: Server error

---

#### POST /api/auth/reset-password
Reset password using reset token.

**Request Body:**
```json
{
  "resetToken": "uuid-reset-token",
  "newPassword": "newpassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Password reset successful"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid or expired reset token
- `500 Internal Server Error`: Server error

---

### Course Routes

#### GET /api/courses
Get all available courses.

**Query Parameters:**
- `category` (optional): Filter by category
- `level` (optional): Filter by level (beginner, intermediate, advanced)
- `page` (optional): Page number for pagination
- `limit` (optional): Number of courses per page

**Response (200 OK):**
```json
[
  {
    "id": "course-uuid-1",
    "title": "Web Development Bootcamp",
    "description": "Learn web development from scratch",
    "instructor": "John Smith",
    "category": "Web Development",
    "rating": 4.8,
    "students": 15234,
    "duration": "40 hours",
    "lectures": 120,
    "level": "Beginner",
    "price": 89.99,
    "isPaid": true,
    "image": "https://example.com/course-image.jpg",
    "icon": "💻",
    "whatYouLearn": [
      "HTML5 and CSS3",
      "JavaScript fundamentals",
      "React.js basics",
      "Node.js and Express"
    ],
    "instructorBio": "Experienced web developer with 10+ years of industry experience",
    "certificateType": "paid",
    "certificatePrice": 29.99
  }
]
```

---

#### GET /api/courses/:id
Get specific course details.

**Path Parameters:**
- `id`: Course UUID

**Response (200 OK):**
```json
{
  "id": "course-uuid-1",
  "title": "Web Development Bootcamp",
  "description": "Comprehensive web development course covering modern technologies",
  "instructor": "John Smith",
  "category": "Web Development",
  "rating": 4.8,
  "students": 15234,
  "duration": "40 hours",
  "lectures": 120,
  "level": "Beginner",
  "price": 89.99,
  "isPaid": true,
  "image": "https://example.com/course-image.jpg",
  "icon": "💻",
  "whatYouLearn": [
    "HTML5 and CSS3",
    "JavaScript fundamentals",
    "React.js basics",
    "Node.js and Express"
  ],
  "instructorBio": "Experienced web developer with 10+ years of industry experience",
  "certificateType": "paid",
  "certificatePrice": 29.99,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `404 Not Found`: Course not found
- `500 Internal Server Error`: Server error

---

## 📊 Data Models

### User Model
```json
{
  "id": "uuid-string",
  "name": "string (required)",
  "email": "string (required, unique)",
  "password": "string (hashed, required)",
  "role": "string (student|instructor, default: student)",
  "enrolledCourses": ["array of course IDs"],
  "createdAt": "ISO datetime",
  "updatedAt": "ISO datetime",
  "resetToken": "string (optional, for password reset)",
  "resetTokenExpiry": "ISO datetime (optional)"
}
```

### Course Model
```json
{
  "id": "uuid-string",
  "title": "string (required)",
  "description": "string (required)",
  "instructor": "string (required)",
  "category": "string (required)",
  "rating": "number (0-5)",
  "students": "number",
  "duration": "string (e.g., '40 hours')",
  "lectures": "number",
  "level": "string (beginner|intermediate|advanced)",
  "price": "number",
  "isPaid": "boolean",
  "image": "string (URL)",
  "icon": "string (emoji)",
  "whatYouLearn": ["array of strings"],
  "instructorBio": "string",
  "certificateType": "string (free|paid|premium)",
  "certificatePrice": "number",
  "createdAt": "ISO datetime",
  "updatedAt": "ISO datetime"
}
```

---

## 🔒 Error Handling

### Standard Error Response Format
```json
{
  "message": "Error description",
  "error": "Detailed error information (optional)"
}
```

### HTTP Status Codes
- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## 🌐 CORS Configuration

### Development
```javascript
origin: ["http://localhost:3000", "http://localhost:3001"]
```

### Production
```javascript
origin: ["https://your-domain.com"]
```

---

## 📝 Usage Examples

### JavaScript (Axios)
```javascript
// Register user
const register = async (userData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', userData);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return user;
  } catch (error) {
    console.error('Registration failed:', error.response.data);
  }
};

// Get courses
const getCourses = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/courses');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch courses:', error.response.data);
  }
};

// Get user profile (protected)
const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/auth/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get user profile:', error.response.data);
  }
};
```

### cURL Examples
```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login user
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get courses
curl -X GET http://localhost:5000/api/courses

# Get user profile (with token)
curl -X GET http://localhost:5000/api/auth/user \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🔄 Rate Limiting

Currently not implemented, but recommended for production:
- Authentication endpoints: 5 requests per minute
- General endpoints: 100 requests per minute

---

## 📈 Monitoring

### Logging
- All API requests are logged
- Errors are logged with stack traces
- Authentication events are tracked

### Health Check
```bash
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": "2 hours 30 minutes"
}
```

---

## 🚀 Production Considerations

1. **Security**
   - Use HTTPS in production
   - Implement rate limiting
   - Add input validation
   - Use environment variables for secrets

2. **Performance**
   - Add database indexes
   - Implement caching
   - Use CDN for static assets
   - Monitor response times

3. **Scalability**
   - Use load balancer
   - Implement database clustering
   - Add horizontal scaling
   - Monitor resource usage

---

**For more information, check the [main README](./README.md) or [deployment guide](./DEPLOYMENT.md).**
