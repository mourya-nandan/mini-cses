const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');

const problemsRouter = require('./routes/problems');
const submitRouter = require('./routes/submit');

const app = express();
const PORT = process.env.PORT || 3000;


connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/problems', problemsRouter);
app.use('/api/submit', submitRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
