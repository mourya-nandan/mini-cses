const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./index');
const Problem = require('../models/Problem');

// Load env vars
dotenv.config({ path: '../.env' });

const problems = [
  {
    id: 1,
    title: "Sum of Two Integers",
    description: "Given two integers A and B, calculate their sum.\n\nInput:\nThe first line contains two integers A and B.\n\nOutput:\nPrint the sum of A and B.",
    testCases: [
      { input: "2 3", output: "5" },      // Public 1
      { input: "-5 10", output: "5" },    // Public 2
      { input: "10 20", output: "30" },   // Public 3
      { input: "100 200", output: "300" }, // Private 1
      { input: "0 0", output: "0" },       // Private 2
      { input: "1234 4321", output: "5555" } // Private 3
    ]
  },
  {
    id: 2,
    title: "Product of Two Integers",
    description: "Given two integers A and B, calculate their product.\n\nInput:\nThe first line contains two integers A and B.\n\nOutput:\nPrint the product of A and B.",
    testCases: [
      { input: "2 3", output: "6" },      // Public 1
      { input: "-5 10", output: "-50" },  // Public 2
      { input: "0 10", output: "0" },     // Public 3
      { input: "100 200", output: "20000" }, // Private 1
      { input: "-10 -10", output: "100" },   // Private 2
      { input: "123 456", output: "56088" }  // Private 3
    ]
  }
];

const seedDB = async () => {
  await connectDB();

  try {
    await Problem.deleteMany({}); // Clear old data
    console.log('Old problems removed...');

    await Problem.insertMany(problems);
    console.log('Data Imported!');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
