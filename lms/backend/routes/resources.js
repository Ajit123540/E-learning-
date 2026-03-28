const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { auth, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

// @route   GET api/resources
// @desc    Get all resources (notes and assignments)
// @access  Private (All authenticated users can see)
router.get('/', auth, async (req, res) => {
  try {
    const { db } = req;
    const resources = db.data.resources || [];
    
    // Populate uploader details
    const populatedResources = resources.map(resource => {
      const uploader = db.data.users?.find(u => u.id === resource.uploaderId);
      return {
        ...resource,
        uploader: uploader ? { name: uploader.name, email: uploader.email, role: uploader.role } : null
      };
    });
    
    // Sort by newest first
    populatedResources.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json(populatedResources);
  } catch (err) {
    console.error('Get resources error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   POST api/resources
// @desc    Upload a new resource
// @access  Private (Instructor/Admin only)
router.post(
  '/',
  [auth, authorize('instructor', 'admin')],
  (req, res, next) => {
    upload.single('file')(req, res, function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      const { title, description, type, courseId } = req.body;
      const file = req.file;

      if (!title || !type || !file) {
        // Remove uploaded file if validation fails
        if (file) fs.unlinkSync(file.path);
        return res.status(400).json({ message: 'Title, type, and file are required.' });
      }

      const { db } = req;
      
      const newResource = {
        id: uuidv4(),
        title,
        description: description || '',
        type, // 'note' or 'assignment'
        courseId: courseId || null,
        fileName: file.originalname,
        fileUrl: `/uploads/${file.filename}`,
        fileType: file.mimetype,
        fileSize: file.size,
        uploaderId: req.user.id,
        createdAt: new Date().toISOString()
      };

      db.data.resources = db.data.resources || [];
      db.data.resources.push(newResource);
      await db.write();

      res.status(201).json(newResource);
    } catch (err) {
      console.error('Upload resource error:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
);

// @route   DELETE api/resources/:id
// @desc    Delete a resource
// @access  Private (Instructor/Admin only)
router.delete('/:id', [auth, authorize('instructor', 'admin')], async (req, res) => {
  try {
    const { db } = req;
    const resourceIndex = db.data.resources.findIndex(r => r.id === req.params.id);
    
    if (resourceIndex === -1) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const resource = db.data.resources[resourceIndex];

    // Check authorization: only admin or the user who uploaded it
    if (resource.uploaderId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this resource' });
    }

    // Try to delete the physical file
    if (resource.fileUrl) {
      const filename = path.basename(resource.fileUrl);
      const filePath = path.join(__dirname, '../uploads', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Remove from db
    db.data.resources.splice(resourceIndex, 1);
    await db.write();

    res.json({ message: 'Resource removed successfully' });
  } catch (err) {
    console.error('Delete resource error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
