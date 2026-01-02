const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true }
});

const problemSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Legacy ID to match Frontend
  title: { type: String, required: true },
  description: { type: String, required: true },
  testCases: [testCaseSchema] // Embedded Test Cases (The Power of Mongo!)
});

module.exports = mongoose.model('Problem', problemSchema);