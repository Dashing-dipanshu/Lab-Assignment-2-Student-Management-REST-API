// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
let students = require('../data/students');

// 1. GET /students - View all students
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: students
  });
});

// 2. GET /students/:id - View student by ID
router.get('/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${studentId} not found.`
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

// 3. POST /students - Create new student
router.post('/', (req, res) => {
  const { name, course } = req.body;

  // Input Validation
  if (!name || !course) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both name and course.'
    });
  }

  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name,
    course
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: 'Student created successfully.',
    data: newStudent
  });
});

// 4. PUT /students/:id - Update student by ID
router.put('/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const { name, course } = req.body;

  const studentIndex = students.findIndex(s => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${studentId} not found.`
    });
  }

  // Input Validation
  if (!name || !course) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both name and course to update.'
    });
  }

  students[studentIndex] = {
    id: studentId,
    name,
    course
  };

  res.status(200).json({
    success: true,
    message: 'Student updated successfully.',
    data: students[studentIndex]
  });
});

// 5. DELETE /students/:id - Delete student by ID
router.delete('/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex(s => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${studentId} not found.`
    });
  }

  const deletedStudent = students.splice(studentIndex, 1);

  res.status(200).json({
    success: true,
    message: 'Student deleted successfully.',
    data: deletedStudent[0]
  });
});

module.exports = router;