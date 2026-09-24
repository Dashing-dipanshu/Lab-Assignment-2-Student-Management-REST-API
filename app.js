// app.js
const express = require('express');
const logger = require('./middleware/logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing Middleware
app.use(express.json());

// Custom Logger Middleware
app.use(logger);

// Routes
app.use('/students', studentRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Student Management REST API!');
});

// 404 Route Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found.'
  });
});

// Global Error Handler (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});