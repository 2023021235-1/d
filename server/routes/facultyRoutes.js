const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');
const { verifyToken, IsAdmin } = require('../middlewares/authMiddleware');
const upload = require('../config/multer');

// Faculty Profile Routes
router.get('/faculty_profile/:id', facultyController.getFacultyProfile);
router.get('/facultylist', facultyController.getAllFaculty);
router.get('/faculty_dashboard', verifyToken, facultyController.getFacultyDashboard);

// Faculty CRUD Operations (Admin only)
router.post('/addfaculty', verifyToken, IsAdmin, upload.none(), facultyController.addFaculty);
router.get('/delete_faculty/:id', verifyToken, IsAdmin, facultyController.deleteFaculty);

// Faculty Details Update Routes
router.post('/update_faculty_details', verifyToken, upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), facultyController.updateFacultyDetails);

// Faculty Experiences
router.get('/faculty_experiences', verifyToken, facultyController.getFacultyExperiences);
router.get('/update_faculty_experience', verifyToken, facultyController.getFacultyExperiences);
router.post('/update_faculty_experience', verifyToken, facultyController.addFacultyExperience);
router.post('/delete_faculty_experience/:experienceId', verifyToken, facultyController.deleteFacultyExperience);

// Faculty Awards
router.get('/faculty_awards', verifyToken, facultyController.getFacultyAwards);
router.post('/update_faculty_award', verifyToken, facultyController.addFacultyAward);
router.post('/delete_faculty_award/:awardId', verifyToken, facultyController.deleteFacultyAward);

// Faculty Qualifications
router.get('/faculty_qualifications', verifyToken, facultyController.getFacultyQualifications);
router.post('/update_faculty_qualification', verifyToken, facultyController.addFacultyQualification);
router.post('/delete_faculty_qualification/:qualificationId', verifyToken, facultyController.deleteFacultyQualification);

// Faculty Publications
router.get('/faculty_publications', verifyToken, facultyController.getFacultyPublications);
router.get('/update_faculty_publications', verifyToken, facultyController.getFacultyPublications);
router.post('/add_faculty_publication', verifyToken, facultyController.addFacultyPublication);
router.post('/update_faculty_publication', verifyToken, facultyController.addFacultyPublication);
router.post('/delete_faculty_publication/:publicationId', verifyToken, facultyController.deleteFacultyPublication);

// Department Views
router.get('/viewfaculty', facultyController.getArtsFaculty);
router.get('/department', facultyController.getDepartmentPage);

module.exports = router;