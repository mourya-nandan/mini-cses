const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const category = req.query.category || '';
    const difficulty = req.query.difficulty || '';

    const query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    const total = await Problem.countDocuments(query);
    const problems = await Problem.find(query, 'id title category difficulty').sort({ id: 1 }).skip((page - 1) * limit).limit(limit);

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
      constraints: problem.constraints,
      timeLimit: problem.timeLimit,
      memoryLimit: problem.memoryLimit,
      examples: problem.sampleTestCases 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
