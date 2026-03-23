const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { auth, authorize } = require('../middleware/auth');
const Course = require('../models/Course');

// @route   GET api/courses
// @desc    Get all published courses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .populate('instructor', 'name email')
      .sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/courses/:id
// @desc    Get course by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name email')
      .populate('studentsEnrolled', 'name email');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(500).send('Server Error');
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
      const newCourse = new Course({
        ...req.body,
        instructor: req.user.id,
      });

      const course = await newCourse.save();
      res.json(course);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/courses/:id
// @desc    Update a course
// @access  Private (Instructor/Admin)
router.put(
  '/:id',
  [auth, authorize('instructor', 'admin')],
  async (req, res) => {
    try {
      let course = await Course.findById(req.params.id);

      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      // Check if user is the course instructor or admin
      if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'User not authorized' });
      }

      course = await Course.findByIdAndUpdate(
        req.params.id,
        { $set: req.body, updatedAt: Date.now() },
        { new: true }
      );

      res.json(course);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/courses/:id
// @desc    Delete a course
// @access  Private (Instructor/Admin)
router.delete('/:id', [auth, authorize('instructor', 'admin')], async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is the course instructor or admin
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await course.remove();
    res.json({ message: 'Course removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/courses/enroll/:id
// @desc    Enroll in a course
// @access  Private
router.post('/enroll/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    if (
      course.studentsEnrolled.some(
        (student) => student.toString() === req.user.id
      )
    ) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    course.studentsEnrolled.unshift(req.user.id);
    await course.save();

    // Add course to user's enrolled courses
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { enrolledCourses: course._id },
    });

    res.json(course.studentsEnrolled);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
