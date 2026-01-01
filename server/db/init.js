const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'problems.db');
const db = new sqlite3.Database(dbPath);

const problems = [
  {
    id: 1,
    title: "Sum of Two Integers",
    description: "Given two integers A and B, calculate their sum.\n\nInput:\nThe first line contains two integers A and B.\n\nOutput:\nPrint the sum of A and B.",
    test_cases: [
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
    test_cases: [
      { input: "2 3", output: "6" },      // Public 1
      { input: "-5 10", output: "-50" },  // Public 2
      { input: "0 10", output: "0" },     // Public 3
      { input: "100 200", output: "20000" }, // Private 1
      { input: "-10 -10", output: "100" },   // Private 2
      { input: "123 456", output: "56088" }  // Private 3
    ]
  }
];

db.serialize(() => {
  // 1. Create Table
  db.run(`CREATE TABLE IF NOT EXISTS problems (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    test_cases TEXT
  )`);

  // 2. Prepare Statement
  const stmt = db.prepare("INSERT OR REPLACE INTO problems (id, title, description, test_cases) VALUES (?, ?, ?, ?)");

  // 3. Loop through problems array
  problems.forEach((p) => {
    stmt.run(p.id, p.title, p.description, JSON.stringify(p.test_cases), (err) => {
      if (err) console.error(`Error inserting problem ${p.id}:`, err);
      else console.log(`Seeded: ${p.title}`);
    });
  });

  // 4. Cleanup
  stmt.finalize(() => {
    db.close();
  });
});