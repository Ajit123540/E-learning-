require('dotenv').config();
const express = require('express');
const { Low, JSONFile } = require('lowdb');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Initialize database
const file = path.join(__dirname, 'db.json');

// Create db.json if it doesn't exist
if (!fs.existsSync(file)) {
  fs.writeFileSync(file, JSON.stringify({
    users: [],
    courses: []
  }, null, 2));
}

// Initialize the database
const adapter = new JSONFile(file);
const db = new Low(adapter);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database middleware
app.use(async (req, res, next) => {
  await db.read();
  // Initialize empty arrays if they don't exist
  db.data = db.data || { users: [], courses: [] };
  db.data.users = db.data.users || [];
  db.data.courses = db.data.courses || [];
  
  // Save the initialized data
  await db.write();
  
  // Attach db to request object
  req.db = db;
  next();
});

// Routes
app.use('/api/courses', require('./models/Course'));
app.use('/api/auth', require('./routes/auth'));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the LMS API (JSON Database)');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

// Initialize database and start server
async function startServer() {
  try {
    // Ensure the database file exists
    if (!fs.existsSync(file)) {
      await db.read();
      db.data = { users: [], courses: [] };
      await db.write();
    }
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Using JSON file-based database at: ${file}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();