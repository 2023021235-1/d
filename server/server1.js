const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");



// Routes
const authRoutes = require('./routes/authRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const newsRoutes = require('./routes/newsRoutes');
const alumniRoutes = require('./routes/alumniRoutes');
const registrationRoute = require('./routes/registrationRoute');

require('dotenv').config();

const app = express();


// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// Add other route files...
app.use('/api/reg', registrationRoute);
app.use('/auth', authRoutes);
app.use('/faculty', facultyRoutes);
app.use('/news',newsRoutes);
app.use('/alumni',alumniRoutes)
// Use other routes...

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));