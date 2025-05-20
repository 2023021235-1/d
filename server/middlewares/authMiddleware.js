const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secure-secret-key';

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.Id,
      userType: user.UserType,
      username: user.Id,
      email: user.Id
    },
    JWT_SECRET,
    { expiresIn: '2h' }
  );
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({
      error: {
        code: 403,
        message: 'No token provided'
      }
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: {
          code: 401,
          message: 'Unauthorized: Invalid token'
        }
      });
    }
    
    req.user = decoded;
    next();
  });
};

const IsAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      error: {
        code: 401,
        message: 'Unauthorized: Please log in'
      }
    });
  }

  if (req.user.userType === 'admin') {
    return next();
  }

  console.warn('Unauthorized admin access attempt by user:', req.user.username);
  return res.status(403).json({
    error: {
      code: 403,
      message: 'Forbidden: Admins only'
    }
  });
};

module.exports = {
  generateToken,
  verifyToken,
  IsAdmin
};