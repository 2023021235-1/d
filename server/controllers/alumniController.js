const connection = require('../config/db');
const fs = require('fs');
const path = require('path');

module.exports = {
  // Get alumni registration page data
  getRegistrationPage: (req, res) => {
    res.status(200).json({
      error: false,
      message: 'Alumni registration page data'
    });
  },

  // Get alumni association page data
  getAlumniAssociationPage: (req, res) => {
    res.status(200).json({
      message: 'Alumni association page data'
    });
  },

  // Register new alumni
  registerAlumni: (req, res) => {
    try {
      const {
        name,
        father,
        mother,
        email,
        MoNo,
        dob,
        Address,
        gender,
        degree,
        year,
        designation,
        workingplace,
        specialization
      } = req.body;

      // Validate required fields
      if (!req.file || !name || !email) {
        return res.status(400).json({
          error: true,
          message: 'Missing required fields'
        });
      }

      const photoPath = req.file.filename;

      const sql = `
        INSERT INTO railway.alumni 
        (Name, Father, Mother, Dob, Address, Gender, Email, Mobile, Photo, 
         Degree, YearofPassing, Designation, WorkingAddress, Specialization) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        name,
        father,
        mother,
        dob,
        Address,
        gender,
        email,
        MoNo,
        photoPath,
        degree,
        year,
        designation,
        workingplace,
        specialization
      ];

      connection.query(sql, values, (err, result) => {
        if (err) {
          // Delete uploaded file if DB operation fails
          if (req.file) {
            fs.unlink(path.join(__dirname, '../public/docs/', req.file.filename), 
            (unlinkErr) => {
              if (unlinkErr) console.error('File cleanup error:', unlinkErr);
            });
          }

          console.error('Database error:', err);
          return res.status(500).json({
            error: true,
            message: 'Registration failed. Please try again.'
          });
        }

        res.status(201).json({
          success: true,
          message: 'Registration successful',
          alumniId: result.insertId
        });
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        error: true,
        message: 'An unexpected error occurred'
      });
    }
  },

  // Get all alumni (admin only)
  getAllAlumni: (req, res) => {
  var sql='SELECT * FROM railway.alumni;';
  connection.query(sql, function (err, data) {
    if (err){
      throw err;
    } 
    else{
     // res.render('viewalumni',{send:data,header_marquee_data});
     res.status(200).json({send:data});
    }
  });
  },

  // Additional methods could include:
  // - getAlumniById
  // - updateAlumni
  // - deleteAlumni
  // - searchAlumni
};