const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Database Connection
const dbPath = path.resolve(__dirname, 'db/problems.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('DB Connection Error:', err);
  else console.log('Connected to SQLite DB');
});

// Endpoint: Get All Problems
app.get('/api/problems', (req, res) => {
  db.all("SELECT id, title FROM problems", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Endpoint: Get Problem Details
app.get('/api/problems/:id', (req, res) => {
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

// Endpoint: Submit Solution
app.post('/api/submit', async (req, res) => {
  const { problemId, code } = req.body;
  
  if (!code) return res.status(400).json({ error: "No code provided" });

  // 1. Fetch Test Cases
  db.get("SELECT test_cases FROM problems WHERE id = ?", [problemId], async (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Problem not found" });

    const testCases = JSON.parse(row.test_cases);
    const uniqueId = Date.now();
    const sourcePath = path.join(__dirname, 'temp', `sub_${uniqueId}.cpp`);
    const execPath = path.join(__dirname, 'temp', `sub_${uniqueId}`);
    
    //console.log(testCases);

    // 2. Write File
    fs.writeFileSync(sourcePath, code);

    // 3. Compile
    exec(`g++ "${sourcePath}" -o "${execPath}"`, async (error, stdout, stderr) => {
      if (error) {
        cleanup(sourcePath, execPath);
        return res.json({ 
          status: "Compilation Error", 
          message: stderr 
        });
      }

      // 4. Run Test Cases
      let allPassed = true;
      let results = [];

      for (const tc of testCases) {
        try {
          const userOutput = await runTestCase(execPath, tc.input);
          const passed = userOutput.trim() === tc.output.trim();
          results.push({ 
            input: tc.input, 
            expected: tc.output, 
            actual: userOutput, 
            passed 
          });
          if (!passed) allPassed = false;
        } catch (e) {
          allPassed = false;
          results.push({ input: tc.input, passed: false, error: "Runtime Error" });
        }
      }

      cleanup(sourcePath, execPath);
      res.json({ 
        status: allPassed ? "Accepted" : "Wrong Answer", 
        results 
      });
    });
  });
});

// Helper: Run Single Test Case
function runTestCase(execPath, input) {
  return new Promise((resolve, reject) => {
    const child = spawn(execPath);
    let output = '';
    let error = '';

    // Timeout (1 second)
    const timeout = setTimeout(() => {
      child.kill();
      reject(new Error("Time Limit Exceeded"));
    }, 1000);

    child.stdin.write(input);
    child.stdin.end();

    child.stdout.on('data', (data) => output += data.toString());
    child.stderr.on('data', (data) => error += data.toString());

    child.on('close', (code) => {
      clearTimeout(timeout);
      if (code !== 0) reject(new Error(error || "Runtime Error"));
      else resolve(output);
    });
  });
}

function cleanup(source, exec) {
  if (fs.existsSync(source)) fs.unlinkSync(source);
  if (fs.existsSync(exec)) fs.unlinkSync(exec);
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
