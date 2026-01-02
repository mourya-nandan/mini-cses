const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

// Endpoint: Get All Problems
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find({}, 'id title');
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint: Get Problem Details
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await Problem.findOne({ id: parseInt(id) });
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    // Extract Public Examples (First 3 test cases)
    // In Mongo, testCases is already an array, so no JSON.parse needed!
    const examples = problem.testCases.slice(0, 3);

    res.json({
      id: problem.id,
      title: problem.title,
      description: problem.description,
      examples: examples 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;