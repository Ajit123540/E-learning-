const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { auth, authorize } = require('../middleware/auth');
const CourseModel = require('./CourseModel');

// Initialize course model
const getCourseModel = (req) => new CourseModel(req.db);

// @route   GET api/courses
// @desc    Get all published courses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const courseModel = getCourseModel(req);
    const courses = await courseModel.findAll();
    const publishedCourses = courses.filter(course => course.isPublished);
    
    // Populate instructor details
    const coursesWithInstructors = publishedCourses.map(course => {
      const instructor = req.db.data.users?.find(u => u.id === course.instructor);
      return {
        ...course,
        instructor: instructor ? { 
          id: instructor.id, 
          name: instructor.name,
          email: instructor.email
        } : null
      };
    });
    
    res.json(coursesWithInstructors);
  } catch (err) {
    console.error('Get courses error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   GET api/courses/:id
// @desc    Get course by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { db } = req;
    const course = db.data.courses.find(c => c.id === req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Populate instructor and students
    const instructor = db.data.users.find(u => u.id === course.instructor);
    const students = db.data.users.filter(u => 
      course.studentsEnrolled.includes(u.id)
    ).map(({ id, name, email }) => ({ id, name, email }));
    
    res.json({
      ...course,
      instructor: instructor ? { 
        id: instructor.id, 
        name: instructor.name,
        email: instructor.email
      } : null,
      studentsEnrolled: students
    });
  } catch (err) {
    console.error('Get course error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   POST api/courses
// @desc    Create a course
// @access  Private (Instructor/Admin)
router.post(
  '/',
  [
    auth,
    authorize('instructor', 'admin'),
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
      check('price', 'Please include a valid price').isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { db } = req;
      const { title, description, category, price, imageUrl, sections } = req.body;

      const newCourse = {
        id: uuidv4(),
        title,
        description,
        category,
        price: Number(price),
        instructor: req.user.id,
        imageUrl: imageUrl || 'default-course.jpg',
        isPublished: false,
        sections: sections || [],
        studentsEnrolled: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      db.data.courses.push(newCourse);
      await db.write();

      res.status(201).json(newCourse);
    } catch (err) {
      console.error('Create course error:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
);

// @route   PUT api/courses/:id
// @desc    Update a course
// @access  Private (Instructor/Admin)
router.put('/:id', [auth, authorize('instructor', 'admin')], async (req, res) => {
  try {
    const { db } = req;
    const courseIndex = db.data.courses.findIndex(c => c.id === req.params.id);
    
    if (courseIndex === -1) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is the course instructor or admin
    if (db.data.courses[courseIndex].instructor !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }

    const updatedCourse = {
      ...db.data.courses[courseIndex],
      ...req.body,
      updatedAt: new Date().toISOString(),
      // Don't allow changing these fields directly
      id: db.data.courses[courseIndex].id,
      instructor: db.data.courses[courseIndex].instructor,
      createdAt: db.data.courses[courseIndex].createdAt,
      studentsEnrolled: db.data.courses[courseIndex].studentsEnrolled
    };

    db.data.courses[courseIndex] = updatedCourse;
    await db.write();

    res.json(updatedCourse);
  } catch (err) {
    console.error('Update course error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   DELETE api/courses/:id
// @desc    Delete a course
// @access  Private (Instructor/Admin)
router.delete('/:id', [auth, authorize('instructor', 'admin')], async (req, res) => {
  try {
    const { db } = req;
    const courseIndex = db.data.courses.findIndex(c => c.id === req.params.id);
    
    if (courseIndex === -1) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is the course instructor or admin
    if (db.data.courses[courseIndex].instructor !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }

    // Remove course from enrolled students
    db.data.users.forEach(user => {
      const courseIndex = user.enrolledCourses.indexOf(req.params.id);
      if (courseIndex !== -1) {
        user.enrolledCourses.splice(courseIndex, 1);
      }
    });

    // Remove the course
    db.data.courses.splice(courseIndex, 1);
    await db.write();

    res.json({ message: 'Course removed' });
  } catch (err) {
    console.error('Delete course error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   POST api/courses/enroll/:id
// @desc    Enroll in a course
// @access  Private
router.post('/enroll/:id', auth, async (req, res) => {
  try {
    const { db } = req;
    const course = db.data.courses.find(c => c.id === req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    if (course.studentsEnrolled.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Add student to course
    course.studentsEnrolled.push(req.user.id);
    
    // Add course to user's enrolled courses
    const user = db.data.users.find(u => u.id === req.user.id);
    if (user) {
      user.enrolledCourses = user.enrolledCourses || [];
      if (!user.enrolledCourses.includes(course.id)) {
        user.enrolledCourses.push(course.id);
      }
    }

    await db.write();
    res.json({ message: 'Successfully enrolled in course' });
  } catch (err) {
    console.error('Enroll error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;