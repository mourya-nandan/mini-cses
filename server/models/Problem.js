const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true }
});

const problemSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Legacy ID to match Frontend
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  constraints: { type: String, required: false }, // Input constraints (e.g. 1 <= N <= 10^5)
  inputFormat: { type: String, required: true },
  outputFormat: { type: String, required: true },
  timeLimit: { type: Number, required: true, default: 1000 }, // in milliseconds (default 1s)
  memoryLimit: { type: Number, required: true, default: 256 }, // in MB (default 256MB)
  sampleTestCases: [testCaseSchema], // Visible to user in the UI
  hiddenTestCases: [testCaseSchema]  // HIDDEN: Used only by the Judge for evaluation
});

module.exports = mongoose.model('Problem', problemSchema);
