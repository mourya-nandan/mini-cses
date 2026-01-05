const isAuthenticated = (req, res, next) => {
  // Check if session exists and has a userId
  if (req.session && req.session.userId) {
    return next();
  }
  // 401 Unauthorized
  return res.status(401).json({ error: 'Unauthorized: Please log in to perform this action' });
};

const isAdmin = (req, res, next) => {
    // We will implement this later for Admin panels
    // For now, reuse isAuthenticated logic + Role check
    if (req.session && req.session.userId) {
        // ideally fetch user and check role, or store role in session
        // For now, let's keep it simple.
        return next();
    }
    return res.status(401).json({ error: 'Unauthorized' });
};

module.exports = { isAuthenticated };