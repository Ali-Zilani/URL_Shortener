const { getUser } = require("../service/auth");

const restrictToLoggedInUserOnly = async (req, res, next) => {
  try {
    const userUid = req.cookies.uid;
    
    // Check if token exists
    if (!userUid) {
      return res.redirect("/login");
    }

    // Validate token format before calling getUser
    if (typeof userUid !== 'string' || !userUid.includes('.') || userUid.split('.').length !== 3) {
      console.log('Invalid token format:', userUid);
      res.clearCookie('uid'); // Clear invalid cookie
      return res.redirect("/login");
    }

    // Get user from token
    const user = getUser(userUid);
    
    // Check if user is valid
    if (!user) {
      res.clearCookie('uid'); // Clear invalid cookie
      return res.redirect("/login");
    }

    req.user = user; // Attach user to request object
    next();
    
  } catch (error) {
    console.log('Auth error in restrictToLoggedInUserOnly:', error.message);
    res.clearCookie('uid'); // Clear invalid cookie
    return res.redirect("/login");
  }
};

const checkAuth = async (req, res, next) => {
  try {
    const userUid = req.cookies?.uid;
    
    // If no token, continue without user
    if (!userUid) {
      req.user = null;
      return next();
    }

    // Validate token format
    // if (typeof userUid !== 'string' || !userUid.includes('.') || userUid.split('.').length !== 3) {
    //   console.log('Invalid token format in checkAuth:', userUid);
    //   res.clearCookie('uid'); // Clear invalid cookie
    //   req.user = null;
    //   return next();
    // }
    
    // Get user from token
    const user = getUser(userUid);
    req.user = user; // Will be null if token is invalid
    next();
    
  } catch (error) {
    console.log('Auth error in checkAuth:', error.message);
    res.clearCookie('uid'); // Clear invalid cookie
    req.user = null;
    next();
  }
};

module.exports = { restrictToLoggedInUserOnly, checkAuth };