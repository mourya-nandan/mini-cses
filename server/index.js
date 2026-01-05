const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
require('dotenv').config();

const connectDB = require('./db');
const problemsRouter = require('./routes/problems');
const submitRouter = require('./routes/submit');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// 1. CORS: Allow Credentials for Cookies
app.use(cors({
  origin: 'http://localhost:5173', // Vite Frontend
  credentials: true
}));

// 2. Parsers
app.use(express.json());
app.use(cookieParser());

// 3. Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev_secret_key', // Replace in .env
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/minicses',
    ttl: 14 * 24 * 60 * 60 // 14 Days
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true only on HTTPS
    httpOnly: true, // Prevent XSS stealing cookies
    maxAge: 1000 * 60 * 60 * 24, // 1 Day
    sameSite: 'lax' // CSRF protection helper
  }
}));

// 4. CSRF Protection
// Note: We skip CSRF for the judge callback or external APIs if any.
// Here we apply it globally.
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/problems', problemsRouter);
app.use('/api/submit', submitRouter);

// CSRF Error Handler
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  res.status(403).json({ error: 'Invalid or missing CSRF Token' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
