const connection = require('../config/db');

module.exports = {
  // Get faculty profile by ID
  getFacultyProfile: async (req, res) => {
    try {

       
      const username = req.params.id;
      const queries = [
        'SELECT * FROM railway.faculty WHERE Id = ?',
        'SELECT * FROM railway.profession_career WHERE email = ?',
        'SELECT * FROM railway.award WHERE email = ?',
        'SELECT * FROM railway.educational_qualification WHERE email = ?',
        'SELECT * FROM railway.publication WHERE email = ?'
      ];

      const results = await Promise.all(queries.map(query => {
        return new Promise((resolve, reject) => {
          connection.query(query, [username], (err, result) => {
            if (err) reject(err);
            resolve(result);
          });
        });
      }));

      const [facultyDetails, experiences, awards, qualifications, publications] = results;
      res.json({ results: facultyDetails, experiences, awards, qualifications, publications });
    } catch (error) {
      console.error('Error fetching faculty profile:', error);
      res.status(500).json({ error: 'Error fetching faculty profile' });
    }
  },

  // Get all faculty
  getAllFaculty: (req, res) => {
   var sql='SELECT * FROM railway.faculty order by Department, Designation DESC;';
    connection.query(sql, function (err, data) {
      if (err){
        throw err;
      } 
      else{
        // res.render('facultylist',{send:data,header_marquee_data});
        res.status(200).json({send:data});
      }
    });
  },

  // Get faculty dashboard
  getFacultyDashboard: (req, res) => {
      const username = req.user.email; // Now getting from JWT payload
  
 
  
  var sql2 = 'SELECT * FROM railway.faculty WHERE Id="'+username+'";';
  connection.query(sql2, function (err, data) {
    if (err){
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    } 
    else{
       
      res.status(200).json({result: data,username});
    }
  });
  },

  // Add new faculty (Admin only)
  addFaculty: (req, res) => {
    const { name, email, psw, dept, designation, userType } = req.body;

    connection.beginTransaction(err => {
      if (err) {
        console.error('Transaction error:', err);
        return res.status(500).json({ error: 'Transaction error' });
      }

      connection.query(
        'INSERT INTO railway.user (Id, Pass, UserType) VALUES (?, ?, ?)',
        [email, psw, userType],
        (err) => {
          if (err) {
            return connection.rollback(() => {
              console.error('Error inserting user:', err);
              res.status(500).json({ error: 'Error registering faculty' });
            });
          }

          connection.query(
            'INSERT INTO railway.faculty (Id, Name, Department, Designation) VALUES (?, ?, ?, ?)',
            [email, name, dept, designation],
            (err) => {
              if (err) {
                return connection.rollback(() => {
                  console.error('Error inserting faculty:', err);
                  res.status(500).json({ error: 'Error saving faculty data' });
                });
              }

              connection.commit(err => {
                if (err) {
                  return connection.rollback(() => {
                    console.error('Commit error:', err);
                    res.status(500).json({ error: 'Commit error' });
                  });
                }

                res.status(201).json({ message: 'Faculty added successfully' });
              });
            }
          );
        }
      );
    });
  },

  // Delete faculty (Admin only)
  deleteFaculty: (req, res) => {
    const Id = req.params.id;
    connection.query(
      'DELETE FROM railway.faculty WHERE Id = ?',
      [Id],
      (err, result) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Faculty deleted successfully' });
      }
    );
  },

  // Update faculty details
  updateFacultyDetails: (req, res) => {
    const {
      email,
      phone,
      area_of_interest,
      highest_qualification,
      teaching_experience,
      publications_books_patents,
      seminar_conference_workshop_organized,
      seminar_conference_workshop_attended,
      fellowship_awards,
      membership,
      masters_supervised,
      phd_supervised,
      other_info
    } = req.body;

    // Handle file uploads if present
    if (req.files?.photo) {
      const photoFileName = req.files.photo[0].filename;
      connection.query(
        'UPDATE railway.faculty SET photo = ? WHERE Id = ?',
        [photoFileName, email]
      );
    }

    if (req.files?.resume) {
      const resumeFileName = req.files.resume[0].filename;
      connection.query(
        'UPDATE railway.faculty SET resume = ? WHERE Id = ?',
        [resumeFileName, email]
      );
    }

    const updateSql = `
      UPDATE railway.faculty SET
        phone = ?,
        area_of_interest = ?,
        highest_qualification = ?,
        teaching_experience = ?,
        publications_books_patents = ?,
        seminar_conference_workshop_organized = ?,
        seminar_conference_workshop_attended = ?,
        fellowship_awards = ?,
        membership = ?,
        masters_supervised = ?,
        phd_supervised = ?,
        other_info = ?
      WHERE Id = ?;
    `;

    connection.query(
      updateSql,
      [
        phone,
        area_of_interest,
        highest_qualification,
        teaching_experience,
        publications_books_patents,
        seminar_conference_workshop_organized,
        seminar_conference_workshop_attended,
        fellowship_awards,
        membership,
        masters_supervised,
        phd_supervised,
        other_info,
        email
      ],
      (err, result) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ 
          message: 'Faculty details updated successfully',
          affectedRows: result.affectedRows 
        });
      }
    );
  },

  // Get faculty experiences
  getFacultyExperiences: (req, res) => {
    const email = req.user.email;
    connection.query(
      'SELECT * FROM railway.profession_career WHERE email = ?',
      [email],
      (err, data) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ experiences: data });
      }
    );
  },

  // Add faculty experience
  addFacultyExperience: (req, res) => {
    const { designation, _from, _to, organization } = req.body;
    const email = req.user.email;

    connection.query(
      'INSERT INTO railway.profession_career (email, _from, _to, position, organization) VALUES (?, ?, ?, ?, ?)',
      [email, _from, _to, designation, organization],
      (err, result) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Error adding experience' });
        }
        res.status(201).json({ 
          message: 'Experience added successfully',
          id: result.insertId 
        });
      }
    );
  },

  // Delete faculty experience
  deleteFacultyExperience: (req, res) => {
    const experienceId = req.params.experienceId;
    connection.query(
      'DELETE FROM railway.profession_career WHERE id = ?',
      [experienceId],
      (err) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Error deleting experience' });
        }
        res.status(200).json({ message: 'Experience deleted successfully' });
      }
    );
  },

  // Get faculty awards
  getFacultyAwards: (req, res) => {
    const email = req.user.email;
    connection.query(
      'SELECT * FROM railway.award WHERE email = ?',
      [email],
      (err, data) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ awards: data });
      }
    );
  },

  // Add faculty award
  addFacultyAward: (req, res) => {
    const { title, year, organization } = req.body;
    const email = req.user.email;

    connection.query(
      'INSERT INTO railway.award (email, award, year, awarding_organization) VALUES (?, ?, ?, ?)',
      [email, title, year, organization],
      (err, result) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Error adding award' });
        }
        res.status(201).json({ 
          message: 'Award added successfully',
          id: result.insertId 
        });
      }
    );
  },

  // Delete faculty award
  deleteFacultyAward: (req, res) => {
    const awardId = req.params.awardId;
    connection.query(
      'DELETE FROM railway.award WHERE id = ?',
      [awardId],
      (err) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Error deleting award' });
        }
        res.status(200).json({ message: 'Award deleted successfully' });
      }
    );
  },

  // Get faculty qualifications
  getFacultyQualifications: (req, res) => {
    const email = req.user.email;
    connection.query(
      'SELECT * FROM railway.educational_qualification WHERE email = ?',
      [email],
      (err, data) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ qualifications: data });
      }
    );
  },

  // Add faculty qualification
  addFacultyQualification: (req, res) => {
    const { degree, specialisation, institute, year } = req.body;
    const email = req.user.email;

    connection.query(
      'INSERT INTO railway.educational_qualification (email, degree, specialization, institute, year) VALUES (?, ?, ?, ?, ?)',
      [email, degree, specialisation, institute, year],
      (err, result) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Error adding qualification' });
        }
        res.status(201).json({ 
          message: 'Qualification added successfully',
          id: result.insertId 
        });
      }
    );
  },

  // Delete faculty qualification
  deleteFacultyQualification: (req, res) => {
    const qualificationId = req.params.qualificationId;
    connection.query(
      'DELETE FROM railway.educational_qualification WHERE id = ?',
      [qualificationId],
      (err) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Error deleting qualification' });
        }
        res.status(200).json({ message: 'Qualification deleted successfully' });
      }
    );
  },

  // Get faculty publications
  getFacultyPublications: (req, res) => {
    const email = req.user.email;
    connection.query(
      'SELECT * FROM railway.publication WHERE email = ?',
      [email],
      (err, data) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ publications: data });
      }
    );
  },

  // Add faculty publication
  addFacultyPublication: (req, res) => {
    const { publication, department, category, year, month, indexing, issn, impact } = req.body;
    const email = req.user.email;

    connection.query(
      `INSERT INTO railway.publication 
      (email, publication, department, category, year, month, indexing, issnno, impactfactor) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [email, publication, department, category, year, month, indexing, issn, impact],
      (err, result) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Error adding publication' });
        }
        res.status(201).json({ 
          message: 'Publication added successfully',
          id: result.insertId 
        });
      }
    );
  },

  // Delete faculty publication
  deleteFacultyPublication: (req, res) => {
    const publicationId = req.params.publicationId;
    connection.query(
      'DELETE FROM railway.publication WHERE id = ?',
      [publicationId],
      (err) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Error deleting publication' });
        }
        res.status(200).json({ message: 'Publication deleted successfully' });
      }
    );
  },

  // Get arts faculty
  getArtsFaculty: (req, res) => {
    const sql = 'SELECT * FROM faculty where Department="Faculty of Arts"';
  connection.query(sql, (err, data) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }else{
     // res.render('viewfaculty', { results:data, header_marquee_data});
     res.status(200).json({results: data});
    }
  });
  },

  // Get department page data
  getDepartmentPage: (req, res) => {
    res.status(200).json({ message: 'Department page data' });
  }
};