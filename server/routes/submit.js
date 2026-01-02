const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');
const util = require('util');
const Problem = require('../models/Problem');

// Promisify exec to use with await
const execPromise = util.promisify(exec);

// Endpoint: Submit Solution
router.post('/', async (req, res) => {
  const { problemId, code } = req.body;
  
  if (!code) return res.status(400).json({ error: "No code provided" });

  let sourcePath = null;
  let execPath = null;

  try {
    // 1. Fetch Problem (Mongoose)
    const problem = await Problem.findOne({ id: problemId });
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    // Use hiddenTestCases for actual evaluation
    const testCases = problem.hiddenTestCases;
    const timeLimit = problem.timeLimit || 1000;
    const uniqueId = Date.now();
    
    // Ensure temp directory exists
    const tempDir = path.resolve(__dirname, '../temp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    sourcePath = path.join(tempDir, `sub_${uniqueId}.cpp`);
    execPath = path.join(tempDir, `sub_${uniqueId}`);

    // 2. Write File
    fs.writeFileSync(sourcePath, code);

    // 3. Compile
    try {
      await execPromise(`g++ "${sourcePath}" -o "${execPath}"`);
    } catch (compileError) {
      return res.json({ 
        status: "Compilation Error", 
        message: compileError.stderr || compileError.message 
      });
    }

    // 4. Run Test Cases
    let allPassed = true;
    let results = [];

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      try {
        const userOutput = await runTestCase(execPath, tc.input, timeLimit);
        const passed = userOutput.trim() === tc.output.trim();
        
        // Return only status per test case to avoid leaking hidden data
        results.push({ 
          testCase: i + 1,
          passed 
        });
        
        if (!passed) allPassed = false;
      } catch (e) {
        allPassed = false;
        results.push({ 
          testCase: i + 1, 
          passed: false, 
          error: e.message === "Time Limit Exceeded" ? "TLE" : "Runtime Error" 
        });
      }
    }

    res.json({ 
      status: allPassed ? "Accepted" : "Wrong Answer", 
      results 
    });

  } catch (err) {
    console.error("Submit Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // 5. Cleanup (Guaranteed execution)
    if (sourcePath && fs.existsSync(sourcePath)) fs.unlinkSync(sourcePath);
    if (execPath && fs.existsSync(execPath)) fs.unlinkSync(execPath);
  }
});

// Helper: Run Single Test Case
function runTestCase(execPath, input, timeLimit) {
  return new Promise((resolve, reject) => {
    const child = spawn(execPath);
    let output = '';
    let error = '';

    // Dynamic Timeout
    const timeout = setTimeout(() => {
      child.kill();
      reject(new Error("Time Limit Exceeded"));
    }, timeLimit);

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

module.exports = router;