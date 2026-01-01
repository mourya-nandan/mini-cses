const express = require('express');
const router = express.Router();
const db = require('../db');

// Endpoint: Get All Problems
router.get('/', (req, res) => {
  db.all("SELECT id, title FROM problems", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Endpoint: Get Problem Details
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT id, title, description, test_cases FROM problems WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Problem not found" });
    
    // Extract Public Examples (First 3 test cases)
    let examples = [];
    try {
      examples = JSON.parse(row.test_cases || '[]').slice(0, 3);
    } catch (e) {
      console.error("Failed to parse test cases for examples");
    }

    res.json({
      id: row.id,
      title: row.title,
      description: row.description,
      examples: examples 
    });
  });
});

module.exports = router;