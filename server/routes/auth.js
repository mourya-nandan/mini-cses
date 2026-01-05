const express = require('express');
const router = express.Router();
const User = require('../models/User');

// --- 1. GET CSRF TOKEN (Frontend needs this for POST/PUT requests) ---
router.get('/csrf-token', (req, res) => {
  // csurf middleware attaches .csrfToken() method to req
  res.json({ csrfToken: req.csrfToken() });
});

// --- 2. SIGNUP ---
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, displayName } = req.body;

    // A. Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields (Username, Email, Password)' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    
    // Username format validation (Enterprise standard: no spaces, lowercase)
    if (/\s/.test(username)) {
      return res.status(400).json({ error: 'Username cannot contain spaces' });
    }

    // B. Check Existence
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username: username.toLowerCase() }] 
    });
    
    if (existingUser) {
      if (existingUser.email === email) return res.status(400).json({ error: 'Email already exists' });
      if (existingUser.username === username.toLowerCase()) return res.status(400).json({ error: 'Username already taken' });
    }

    // C. Create User
    const newUser = new User({ 
      username: username.toLowerCase(), 
      email, 
      password,
      profile: {
        displayName: displayName || username // Fallback to username if display name is empty
      }
    });
    await newUser.save();

    // D. Auto-Login (Set Session)
    req.session.userId = newUser._id;

    res.status(201).json({ 
      message: 'Account created successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --- 3. LOGIN ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // A. Find User (+password because it's select: false)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // B. Check Password (using Model method)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // C. Create Session
    req.session.userId = user._id;

    // D. Update Last Login
    user.lastLogin = new Date();
    await user.save();

    res.json({ 
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.profile?.avatar
      }
    });

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --- 4. LOGOUT ---
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    
    // Clear cookie logic
    res.clearCookie('connect.sid'); 
    res.json({ message: 'Logged out successfully' });
  });
});

// --- 5. ME (Session Check) ---
router.get('/me', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      // Session exists but user deleted? Kill session
      req.session.destroy();
      return res.status(401).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.profile?.avatar
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;