const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

// Endpoint: Get All Problems (with Pagination & Filtering)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const category = req.query.category || '';
    const difficulty = req.query.difficulty || '';

    const query = {};

    // 1. Text Search (Case-insensitive regex on title)
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // 2. Category Filter
    if (category) {
      query.category = category;
    }

    // 3. Difficulty Filter
    if (difficulty) {
      query.difficulty = difficulty;
    }

    // Execute Query with Pagination
    const total = await Problem.countDocuments(query);
    const problems = await Problem.find(query, 'id title category difficulty')
      .sort({ id: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      problems,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint: Get Problem Details
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await Problem.findOne({ id: parseInt(id) }, '-hiddenTestCases');
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    res.json({
      id: problem.id,
      title: problem.title,
      description: problem.description,
      inputFormat: problem.inputFormat,
      outputFormat: problem.outputFormat,
      timeLimit: problem.timeLimit,
      memoryLimit: problem.memoryLimit,
      examples: problem.sampleTestCases 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;