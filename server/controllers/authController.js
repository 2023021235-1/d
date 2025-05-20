const connection = require('../config/db');
const { generateToken } = require('../middlewares/authMiddleware');

exports.login = async (req, res) => {
  const { uname: username, psw: password } = req.body;

  if (!username || !password) {
    return res.status(403).json({ message: 'Please enter username and password' });
  }

  try {
var sql='SELECT * FROM railway.user WHERE Id="'+username+'";';
  var sql2 = 'SELECT * FROM railway.faculty WHERE Id="'+username+'";';
  
   connection.query(sql, async (err, data) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (data.length === 0) {
      return res.status(403).json({
        message: 'Invalid Username or Password from query 1'
      });
    }

    // Compare passwords (assuming passwords are hashed)
    const user = data[0];
    const passwordIsValid = (user.Pass===password);
    
    if (!passwordIsValid) {
      return res.status(403).json({
        message: 'Invalid Username or Password from query 2'
      });
    }

    // Generate token
    const token = generateToken(user);

    if (user.UserType === "faculty") {
      const sql2 = 'SELECT * FROM railway.faculty WHERE Id = ?';
      connection.query(sql2, [username], (err2, data2) => {
        if (err2) {
          console.error('Database error:', err2);
          return res.status(500).json({ message: 'Database error' });
        }
        
        res.status(200).json({
          token,
          userType: "faculty",
          user: data2[0],
          message: "Login successful"
        });
      });
    } else {
      res.status(200).json({
        token,
        userType: "admin",
        message: "Login successful"
      });
    }
  });
} catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ message: 'Database error' });
  }
};

exports.checkAuth = (req, res) => {
  if (req.user.userType === "admin") {
    return res.status(200).json({ 
      type: "admin",
      authenticated: true,
      user: req.user
    });
  } else if (req.user.userType === "faculty") {
    connection.query('SELECT * FROM railway.faculty WHERE Id = ?', [req.user.username], (err, data) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      
      res.status(200).json({ 
        type: "faculty",
        authenticated: true,
        user: data[0]
      });
    });
  } else {
    res.status(401).json({ authenticated: false });
  }
};

