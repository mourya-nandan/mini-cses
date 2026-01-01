const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'problems.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Create Table
  db.run(`CREATE TABLE IF NOT EXISTS problems (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    test_cases TEXT
  )`);

  // Insert Mock Data: Sum of Two Integers
  const title = "Sum of Two Integers";
  const description = "Given two integers A and B, calculate their sum.\n\nInput:\nThe first line contains two integers A and B.\n\nOutput:\nPrint the sum of A and B.";
  
  // Test Cases: { input: "A B", output: "Sum" }
  // First 3 are PUBLIC (Visible). Remaining are PRIVATE (Hidden).
  const testCases = JSON.stringify([
    { input: "2 3", output: "5" },      // Public 1
    { input: "-5 10", output: "5" },    // Public 2
    { input: "10 20", output: "30" },   // Public 3
    { input: "100 200", output: "300" }, // Private 1
    { input: "0 0", output: "0" },      // Private 2 (Edge Case)
    { input: "1234 4321", output: "5555" } // Private 3 (Large)
  ]);

  // Insert or Ignore
  const stmt = db.prepare("INSERT OR REPLACE INTO problems (id, title, description, test_cases) VALUES (?, ?, ?, ?)");
  stmt.run(1, title, description, testCases, (err) => {
    if (err) console.error("Error inserting:", err);
    else console.log("Database seeded successfully.");
    stmt.finalize(() => {
        db.close();
    });
  });
});
