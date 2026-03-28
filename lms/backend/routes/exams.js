const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

// @route   GET api/exams
// @desc    Get exams (Admins get all, Students get active)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { db } = req;
    const exams = db.data.exams || [];
    
    if (req.user.role !== 'admin' && req.user.role !== 'instructor') {
      const activeExams = exams.filter(e => e.isActive);
      return res.json(activeExams);
    }
    
    res.json(exams);
  } catch (err) {
    console.error('Get exams error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   POST api/exams
// @desc    Create a new exam
// @access  Private (Instructor/Admin)
router.post('/', [auth, authorize('instructor', 'admin')], async (req, res) => {
  try {
    const { title, description, duration, questions } = req.body;
    const { db } = req;
    
    if (!title || !questions || questions.length === 0) {
      return res.status(400).json({ message: 'Title and questions are required' });
    }

    const newExam = {
      id: uuidv4(),
      title,
      description: description || '',
      duration: duration || 60, // in minutes
      questions: questions, // Array of { id, text, options: [], correctAnswer }
      isActive: false,
      authorId: req.user.id,
      createdAt: new Date().toISOString(),
      submissions: []
    };

    db.data.exams = db.data.exams || [];
    db.data.exams.push(newExam);
    await db.write();

    res.status(201).json(newExam);
  } catch (err) {
    console.error('Create exam error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   PUT api/exams/:id
// @desc    Update exam (e.g., mark active/inactive)
// @access  Private (Instructor/Admin)
router.put('/:id', [auth, authorize('instructor', 'admin')], async (req, res) => {
  try {
    const { isActive } = req.body;
    const { db } = req;
    
    db.data.exams = db.data.exams || [];
    const examIndex = db.data.exams.findIndex(e => e.id === req.params.id);
    
    if (examIndex === -1) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    if (isActive !== undefined) {
      db.data.exams[examIndex].isActive = isActive;
    }
    
    await db.write();

    res.json(db.data.exams[examIndex]);
  } catch (err) {
    console.error('Update exam error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   DELETE api/exams/:id
// @desc    Delete an exam
// @access  Private (Instructor/Admin)
router.delete('/:id', [auth, authorize('instructor', 'admin')], async (req, res) => {
  try {
    const { db } = req;
    const examIndex = db.data.exams.findIndex(e => e.id === req.params.id);
    
    if (examIndex === -1) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    db.data.exams.splice(examIndex, 1);
    await db.write();

    res.json({ message: 'Exam removed successfully' });
  } catch (err) {
    console.error('Delete exam error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   POST api/exams/:id/submit
// @desc    Submit exam answers
// @access  Private
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const { answers } = req.body; // { qId: 'answer', ... }
    const { db } = req;
    
    const examIndex = db.data.exams.findIndex(e => e.id === req.params.id);
    if (examIndex === -1) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    const exam = db.data.exams[examIndex];
    if (!exam.isActive) {
      return res.status(400).json({ message: 'Exam is not currently active' });
    }

    // Basic auto-grading
    let score = 0;
    const total = exam.questions.length;
    
    exam.questions.forEach(q => {
      // Assuming answers object keys are question IDs and values are the chosen string/integer answer
      if (answers && answers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    const submission = {
      userId: req.user.id,
      score,
      total,
      submittedAt: new Date().toISOString()
    };
    
    exam.submissions = exam.submissions || [];
    
    // Replace if user already submitted, or you can track multiple attempts
    const existingIndex = exam.submissions.findIndex(s => s.userId === req.user.id);
    if (existingIndex !== -1) {
      exam.submissions[existingIndex] = submission;
    } else {
      exam.submissions.push(submission);
    }
    
    await db.write();

    res.json({ message: 'Exam submitted successfully', score, total });
  } catch (err) {
    console.error('Submit exam error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
