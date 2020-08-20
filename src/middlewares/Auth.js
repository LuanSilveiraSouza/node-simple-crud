const jwt = require('jsonwebtoken'); 

class Auth {
  static verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    
    if(!token) {
      console.log('Token not provided');
      return res.redirect('/login');
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, result) => {
      if(error) {
        console.log('Token expired');
        return res.redirect('/login');
      }
      
      if(!result) {
        console.log('Invalid Token');
        return res.redirect('/login');
      }

      req.username = result.username;

    });

    next();
  }
}

module.exports = Auth;