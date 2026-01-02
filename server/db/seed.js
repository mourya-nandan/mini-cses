const mongoose = require('mongoose');
const Problem = require('../models/Problem');
const connectDB = require('./index');


const sourceData = [
  {
    "id": 201,
    "title": "Sum of Two Numbers",
    "description": "Given two integers A and B, print their sum.",
    "category": "introductory",
    "difficulty": "easy",
    "constraints": {
      "timeLimit": 1000,
      "memoryLimit": 256,
      "inputConstraints": "-10^9 ≤ A, B ≤ 10^9"
    },
    "testCases": [
      { "input": "2 3\n", "output": "5\n" },
      { "input": "-5 10\n", "output": "5\n" }
    ],
    "hiddenTestCases": [
      { "input": "100 200\n", "output": "300\n" },
      { "input": "-10 -20\n", "output": "-30\n" },
      { "input": "0 0\n", "output": "0\n" },
      { "input": "999999999 1\n", "output": "1000000000\n" }
    ]
  },
  {
    "id": 202,
    "title": "Difference of Two Numbers",
    "description": "Given two integers A and B, print A minus B.",
    "category": "introductory",
    "difficulty": "easy",
    "constraints": {
      "timeLimit": 1000,
      "memoryLimit": 256,
      "inputConstraints": "-10^9 ≤ A, B ≤ 10^9"
    },
    "testCases": [
      { "input": "5 3\n", "output": "2\n" },
      { "input": "3 5\n", "output": "-2\n" }
    ],
    "hiddenTestCases": [
      { "input": "10 10\n", "output": "0\n" },
      { "input": "0 5\n", "output": "-5\n" },
      { "input": "-10 -20\n", "output": "10\n" },
      { "input": "1000000000 1\n", "output": "999999999\n" }
    ]
  },
  {
    "id": 203,
    "title": "Product of Two Numbers",
    "description": "Given two integers A and B, print their product.",
    "category": "introductory",
    "difficulty": "easy",
    "constraints": {
      "timeLimit": 1000,
      "memoryLimit": 256,
      "inputConstraints": "-10^6 ≤ A, B ≤ 10^6"
    },
    "testCases": [
      { "input": "4 5\n", "output": "20\n" },
      { "input": "-3 6\n", "output": "-18\n" }
    ],
    "hiddenTestCases": [
      { "input": "0 100\n", "output": "0\n" },
      { "input": "-10 -10\n", "output": "100\n" },
      { "input": "1000 1000\n", "output": "1000000\n" },
      { "input": "1 -1\n", "output": "-1\n" }
    ]
  },
  {
    "id": 204,
    "title": "Maximum of Two Numbers",
    "description": "Given two integers A and B, print the maximum.",
    "category": "introductory",
    "difficulty": "easy",
    "constraints": {
      "timeLimit": 1000,
      "memoryLimit": 128,
      "inputConstraints": "-10^9 ≤ A, B ≤ 10^9"
    },
    "testCases": [
      { "input": "7 3\n", "output": "7\n" },
      { "input": "-2 -5\n", "output": "-2\n" }
    ],
    "hiddenTestCases": [
      { "input": "10 10\n", "output": "10\n" },
      { "input": "-10 0\n", "output": "0\n" },
      { "input": "5 100\n", "output": "100\n" },
      { "input": "-100 -50\n", "output": "-50\n" }
    ]
  },
  {
    "id": 205,
    "title": "Minimum of Two Numbers",
    "description": "Given two integers A and B, print the minimum.",
    "category": "introductory",
    "difficulty": "easy",
    "constraints": {
      "timeLimit": 1000,
      "memoryLimit": 128,
      "inputConstraints": "-10^9 ≤ A, B ≤ 10^9"
    },
    "testCases": [
      { "input": "7 3\n", "output": "3\n" },
      { "input": "-2 -5\n", "output": "-5\n" }
    ],
    "hiddenTestCases": [
      { "input": "0 0\n", "output": "0\n" },
      { "input": "-10 10\n", "output": "-10\n" },
      { "input": "100 5\n", "output": "5\n" },
      { "input": "-50 -100\n", "output": "-100\n" }
    ]
  },
  {
    "id": 206,
    "title": "Even or Odd",
    "description": "Given an integer N, determine whether it is even or odd.",
    "category": "introductory",
    "difficulty": "easy",
    "constraints": {
      "timeLimit": 1000,
      "memoryLimit": 128,
      "inputConstraints": "-10^9 ≤ N ≤ 10^9"
    },
    "testCases": [
      { "input": "4\n", "output": "EVEN\n" },
      { "input": "7\n", "output": "ODD\n" }
    ],
    "hiddenTestCases": [
      { "input": "0\n", "output": "EVEN\n" },
      { "input": "-2\n", "output": "EVEN\n" },
      { "input": "-5\n", "output": "ODD\n" },
      { "input": "1000000000\n", "output": "EVEN\n" }
    ]
  },
  {
    "id": 207,
    "title": "Sum of First N Numbers",
    "description": "Given an integer N, print the sum of the first N natural numbers.",
    "category": "introductory",
    "difficulty": "medium",
    "constraints": {
      "timeLimit": 1000,
      "memoryLimit": 128,
      "inputConstraints": "1 ≤ N ≤ 10^9"
    },
    "testCases": [
      { "input": "5\n", "output": "15\n" },
      { "input": "10\n", "output": "55\n" }
    ],
    "hiddenTestCases": [
      { "input": "1\n", "output": "1\n" },
      { "input": "100\n", "output": "5050\n" },
      { "input": "2\n", "output": "3\n" },
      { "input": "1000\n", "output": "500500\n" }
    ]
  },
  {
    "id": 208,
    "title": "Factorial of a Number",
    "description": "Given an integer N, compute its factorial.",
    "category": "introductory",
    "difficulty": "medium",
    "constraints": {
      "timeLimit": 1000,
      "memoryLimit": 128,
      "inputConstraints": "0 ≤ N ≤ 20"
    },
    "testCases": [
      { "input": "5\n", "output": "120\n" },
      { "input": "0\n", "output": "1\n" }
    ],
    "hiddenTestCases": [
      { "input": "1\n", "output": "1\n" },
      { "input": "3\n", "output": "6\n" },
      { "input": "6\n", "output": "720\n" },
      { "input": "10\n", "output": "3628800\n" }
    ]
  },
  {
    "id": 209,
    "title": "Count Digits",
    "description": "Given an integer N, count the number of digits in it.",
    "category": "introductory",
    "difficulty": "medium",
    "constraints": {
      "timeLimit": 1000,
      "memoryLimit": 128,
      "inputConstraints": "0 ≤ N ≤ 10^18"
    },
    "testCases": [
      { "input": "12345\n", "output": "5\n" },
      { "input": "0\n", "output": "1\n" }
    ],
    "hiddenTestCases": [
      { "input": "9\n", "output": "1\n" },
      { "input": "10\n", "output": "2\n" },
      { "input": "99\n", "output": "2\n" },
      { "input": "1000000\n", "output": "7\n" }
    ]
  },
  {
    "id": 210,
    "title": "Check Prime Number",
    "description": "Determine whether the given number is prime.",
    "category": "introductory",
    "difficulty": "medium",
    "constraints": {
      "timeLimit": 1000,
      "memoryLimit": 128,
      "inputConstraints": "1 ≤ N ≤ 10^9"
    },
    "testCases": [
      { "input": "7\n", "output": "YES\n" },
      { "input": "10\n", "output": "NO\n" }
    ],
    "hiddenTestCases": [
      { "input": "2\n", "output": "YES\n" },
      { "input": "1\n", "output": "NO\n" },
      { "input": "97\n", "output": "YES\n" },
      { "input": "100\n", "output": "NO\n" }
    ]
  },

  // --- DYNAMIC PROGRAMMING PROBLEMS ---
  {
    "id": 301,
    "title": "Climbing Stairs",
    "description": "You are climbing a staircase. It takes N steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top? (Print answer modulo 10^9+7)",
    "category": "dynamic programming",
    "difficulty": "easy",
    "constraints": {
      "timeLimit": 1000,
      "memoryLimit": 256,
      "inputConstraints": "1 ≤ N ≤ 10^5"
    },
    "testCases": [
      { "input": "2\n", "output": "2\n" },
      { "input": "3\n", "output": "3\n" }
    ],
    "hiddenTestCases": [
      { "input": "1\n", "output": "1\n" },
      { "input": "4\n", "output": "5\n" },
      { "input": "5\n", "output": "8\n" },
      { "input": "10\n", "output": "89\n" }
    ]
  },
  {
    "id": 302,
    "title": "Coin Change I",
    "description": "Given a set of coin values and a target sum, find the number of distinct ways to make the sum. You can use each coin any number of times. Print answer modulo 10^9+7.\nInput: N (number of coins), X (target), then N integers.\nOutput: Number of ways.",
    "category": "dynamic programming",
    "difficulty": "medium",
    "constraints": {
      "timeLimit": 1000,
      "memoryLimit": 256,
      "inputConstraints": "1 ≤ N ≤ 100, 1 ≤ X ≤ 10^6"
    },
    "testCases": [
      { "input": "3 9\n2 3 5\n", "output": "8\n" },
      { "input": "1 5\n2\n", "output": "0\n" }
    ],
    "hiddenTestCases": [
      { "input": "2 10\n2 5\n", "output": "2\n" },
      { "input": "1 10\n1\n", "output": "1\n" },
      { "input": "3 6\n1 2 3\n", "output": "7\n" },
      { "input": "3 4\n1 2 3\n", "output": "4\n" }
    ]
  },
  {
    "id": 303,
    "title": "Longest Increasing Subsequence",
    "description": "Given an array of N integers, find the length of the longest strictly increasing subsequence.\nInput: N, then N integers.\nOutput: Length of LIS.",
    "category": "dynamic programming",
    "difficulty": "medium",
    "constraints": {
      "timeLimit": 1000,
      "memoryLimit": 256,
      "inputConstraints": "1 ≤ N ≤ 2*10^5"
    },
    "testCases": [
      { "input": "8\n7 3 5 3 6 2 9 8\n", "output": "4\n" },
      { "input": "5\n1 2 3 4 5\n", "output": "5\n" }
    ],
    "hiddenTestCases": [
      { "input": "5\n5 4 3 2 1\n", "output": "1\n" },
      { "input": "5\n1 1 1 1 1\n", "output": "1\n" },
      { "input": "6\n1 3 2 4 3 5\n", "output": "4\n" },
      { "input": "3\n10 20 30\n", "output": "3\n" }
    ]
  },
  {
    "id": 304,
    "title": "Minimizing Coins",
    "description": "Consider a money system consisting of N coins. Each coin has a positive integer value. Your task is to produce a sum of money X using the available coins in such a way that the number of coins is minimal.\nInput: N X, then N integers.\nOutput: Min coins or -1.",
    "category": "dynamic programming",
    "difficulty": "medium",
    "constraints": {
      "timeLimit": 1000,
      "memoryLimit": 256,
      "inputConstraints": "1 ≤ N ≤ 100, 1 ≤ X ≤ 10^6"
    },
    "testCases": [
      { "input": "3 11\n1 5 7\n", "output": "3\n" },
      { "input": "2 5\n2 4\n", "output": "-1\n" }
    ],
    "hiddenTestCases": [
      { "input": "1 10\n1\n", "output": "10\n" },
      { "input": "1 10\n2\n", "output": "5\n" },
      { "input": "2 10\n3 4\n", "output": "3\n" },
      { "input": "3 10\n1 2 5\n", "output": "2\n" }
    ]
  },
  {
    "id": 305,
    "title": "Grid Paths",
    "description": "Consider an N x N grid whose squares may have traps. It is not allowed to move to a square with a trap. Your task is to calculate the number of paths from the upper-left square to the lower-right square. You can only move right or down.\nInput: N, then N lines of grid (. is free, * is trap).\nOutput: Number of paths mod 10^9+7.",
    "category": "dynamic programming",
    "difficulty": "medium",
    "constraints": {
      "timeLimit": 1000,
      "memoryLimit": 256,
      "inputConstraints": "1 ≤ N ≤ 1000"
    },
    "testCases": [
      { "input": "4\n....\n.*..\n...*\n*...\n", "output": "3\n" },
      { "input": "3\n...\n...\n...\n", "output": "6\n" }
    ],
    "hiddenTestCases": [
      { "input": "2\n..\n..\n", "output": "2\n" },
      { "input": "2\n.*\n..\n", "output": "0\n" },
      { "input": "3\n.*.\n...\n...\n", "output": "3\n" },
      { "input": "1\n.\n", "output": "1\n" }
    ]
  },

  // --- GRAPH ALGORITHMS ---
  {
    "id": 401,
    "title": "Counting Rooms",
    "description": "You are given a map of a building, and your task is to count the number of its rooms. The size of the map is N x M squares, and each square is either floor (.) or wall (#). You can walk left, right, up, and down through the floor squares.\nInput: N M, then grid.\nOutput: Number of rooms.",
    "category": "graph",
    "difficulty": "medium",
    "constraints": {
      "timeLimit": 1000,
      "memoryLimit": 256,
      "inputConstraints": "1 ≤ N, M ≤ 1000"
    },
    "testCases": [
      { "input": "5 8\n########\n#..#...#\n####.#.#\n#..#...#\n########\n", "output": "3\n" },
      { "input": "3 3\n###\n###\n###\n", "output": "0\n" }
    ],
    "hiddenTestCases": [
      { "input": "3 3\n...\n...\n...\n", "output": "1\n" },
      { "input": "4 4\n#.#.\n.#.#\n#.#.\n.#.#\n", "output": "8\n" },
      { "input": "1 5\n.....\n", "output": "1\n" },
      { "input": "5 1\n.\n.\n.\n.\n.\n", "output": "1\n" }
    ]
  },
  {
    "id": 402,
    "title": "Labyrinth",
    "description": "You are given a map of a labyrinth, and your task is to find a path from start (A) to end (B). You can walk left, right, up, and down.\nInput: N M, then grid.\nOutput: 'YES' and length of path, or 'NO'. (Just print YES/NO for simplicity here).",
    "category": "graph",
    "difficulty": "medium",
    "constraints": {
      "timeLimit": 1000,
      "memoryLimit": 256,
      "inputConstraints": "1 ≤ N, M ≤ 1000"
    },
    "testCases": [
      { "input": "5 8\n########\n#.A#...#\n#.##.#B#\n#......#\n########\n", "output": "YES\n" },
      { "input": "3 3\n###\n#A#\n#B#\n", "output": "NO\n" }
    ],
    "hiddenTestCases": [
      { "input": "2 2\nAB\n..\n", "output": "YES\n" },
      { "input": "2 2\nA#\n#B\n", "output": "NO\n" },
      { "input": "1 5\nA...B\n", "output": "YES\n" },
      { "input": "5 1\nA\n.\n.\n.\nB\n", "output": "YES\n" }
    ]
  },
  {
    "id": 403,
    "title": "Building Roads",
    "description": "Byteland has N cities and M roads between them. The goal is to make all cities reachable from each other. Your task is to find the minimum number of new roads required.\nInput: N M, then M edges.\nOutput: Number of new roads required.",
    "category": "graph",
    "difficulty": "medium",
    "constraints": {
      "timeLimit": 1000,
      "memoryLimit": 256,
      "inputConstraints": "1 ≤ N ≤ 10^5, 0 ≤ M ≤ 2*10^5"
    },
    "testCases": [
      { "input": "4 2\n1 2\n3 4\n", "output": "1\n" },
      { "input": "5 0\n", "output": "4\n" }
    ],
    "hiddenTestCases": [
      { "input": "4 3\n1 2\n2 3\n3 4\n", "output": "0\n" },
      { "input": "1 0\n", "output": "0\n" },
      { "input": "3 1\n1 2\n", "output": "1\n" },
      { "input": "6 3\n1 2\n3 4\n5 6\n", "output": "2\n" }
    ]
  },
  {
    "id": 404,
    "title": "Message Route",
    "description": "Syrjälä's network consists of N computers and M connections. Your task is to find if Uolevi can send a message to Maija, and if so, what is the minimum number of computers on such a route.\nInput: N M, then M connections (from 1 to N).\nOutput: Minimum length of route (number of nodes), or IMPOSSIBLE.",
    "category": "graph",
    "difficulty": "medium",
    "constraints": {
      "timeLimit": 1000,
      "memoryLimit": 256,
      "inputConstraints": "1 ≤ N ≤ 10^5, 0 ≤ M ≤ 2*10^5"
    },
    "testCases": [
      { "input": "5 5\n1 2\n1 3\n1 4\n2 3\n5 4\n", "output": "3\n" },
      { "input": "3 1\n1 2\n", "output": "IMPOSSIBLE\n" }
    ],
    "hiddenTestCases": [
      { "input": "2 1\n1 2\n", "output": "2\n" },
      { "input": "4 3\n1 2\n2 3\n3 4\n", "output": "4\n" },
      { "input": "5 4\n1 2\n2 3\n4 5\n1 5\n", "output": "2\n" },
      { "input": "2 0\n", "output": "IMPOSSIBLE\n" }
    ]
  },
  {
    "id": 405,
    "title": "Building Teams",
    "description": "There are N pupils in Uolevi's class, and M friendships between them. Your task is to divide the pupils into two teams in such a way that no two pupils in a team are friends. (Bipartite Check)\nInput: N M, then M edges.\nOutput: 'POSSIBLE' or 'IMPOSSIBLE' (Simplified output).",
    "category": "graph",
    "difficulty": "medium",
    "constraints": {
      "timeLimit": 1000,
      "memoryLimit": 256,
      "inputConstraints": "1 ≤ N ≤ 10^5, 0 ≤ M ≤ 2*10^5"
    },
    "testCases": [
      { "input": "5 3\n1 2\n1 3\n4 5\n", "output": "POSSIBLE\n" },
      { "input": "3 3\n1 2\n2 3\n1 3\n", "output": "IMPOSSIBLE\n" }
    ],
    "hiddenTestCases": [
      { "input": "4 4\n1 2\n2 3\n3 4\n4 1\n", "output": "POSSIBLE\n" },
      { "input": "2 1\n1 2\n", "output": "POSSIBLE\n" },
      { "input": "5 5\n1 2\n2 3\n3 4\n4 5\n5 1\n", "output": "IMPOSSIBLE\n" },
      { "input": "1 0\n", "output": "POSSIBLE\n" }
    ]
  }
];

const seedDB = async () => {
  await connectDB();

  console.log('Clearing existing problems...');
  await Problem.deleteMany({});

  const formattedProblems = sourceData.map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category,
    difficulty: p.difficulty,
    constraints: p.constraints.inputConstraints || "See description",
    inputFormat: "See description",
    outputFormat: "See description",
    timeLimit: p.constraints.timeLimit,
    memoryLimit: p.constraints.memoryLimit,
    sampleTestCases: p.testCases,
    hiddenTestCases: p.hiddenTestCases || []
  }));

  console.log('Inserting new problems...');
  await Problem.insertMany(formattedProblems);

  console.log('Data Imported Successfully!');
  process.exit();
};

seedDB();
