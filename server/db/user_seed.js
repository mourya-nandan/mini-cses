const mongoose = require("mongoose");
const User = require("../models/User"); // adjust path if needed

const MONGO_URI = "mongodb://127.0.0.1:27017/SchoolDataBase";

const users = [
  // 👑 Admins
  {
    username: "omreddy",
    email: "om@admin.com",
    password: "password123",
    role: "admin",
    solvedProblemIds: [1, 2, 3],
    solvedCount: 3,
  },
  {
    username: "mourya",
    email: "mourya@admin.com",
    password: "password123",
    role: "admin",
    solvedProblemIds: [1, 4],
    solvedCount: 2,
  },

  // 👤 Normal users
  {
    username: "user1",
    email: "user1@mail.com",
    password: "password123",
    role: "user",
    solvedProblemIds: [1],
    solvedCount: 1,
  },
  {
    username: "user2",
    email: "user2@mail.com",
    password: "password123",
    role: "user",
    solvedProblemIds: [2],
    solvedCount: 1,
  },
  {
    username: "user3",
    email: "user3@mail.com",
    password: "password123",
    role: "user",
    solvedProblemIds: [3],
    solvedCount: 1,
  },
  {
    username: "user4",
    email: "user4@mail.com",
    password: "password123",
    role: "user",
    solvedProblemIds: [4],
    solvedCount: 1,
  },
  {
    username: "user5",
    email: "user5@mail.com",
    password: "password123",
    role: "user",
    solvedProblemIds: [5],
    solvedCount: 1,
  },
  {
    username: "user6",
    email: "user6@mail.com",
    password: "password123",
    role: "user",
    solvedProblemIds: [6],
    solvedCount: 1,
  },
  {
    username: "user7",
    email: "user7@mail.com",
    password: "password123",
    role: "user",
    solvedProblemIds: [7],
    solvedCount: 1,
  },
  {
    username: "user8",
    email: "user8@mail.com",
    password: "password123",
    role: "user",
    solvedProblemIds: [8],
    solvedCount: 1,
  },
  {
    username: "user9",
    email: "user9@mail.com",
    password: "password123",
    role: "user",
    solvedProblemIds: [9],
    solvedCount: 1,
  },
  {
    username: "user10",
    email: "user10@mail.com",
    password: "password123",
    role: "user",
    solvedProblemIds: [10],
    solvedCount: 1,
  },
  {
    username: "user11",
    email: "user11@mail.com",
    password: "password123",
    role: "user",
    solvedProblemIds: [11],
    solvedCount: 1,
  },
  {
    username: "user12",
    email: "user12@mail.com",
    password: "password123",
    role: "user",
    solvedProblemIds: [12],
    solvedCount: 1,
  },
  {
    username: "user13",
    email: "user13@mail.com",
    password: "password123",
    role: "user",
    solvedProblemIds: [13],
    solvedCount: 1,
  },
  {
    username: "user14",
    email: "user14@mail.com",
    password: "password123",
    role: "user",
    solvedProblemIds: [14],
    solvedCount: 1,
  },
  {
    username: "user15",
    email: "user15@mail.com",
    password: "password123",
    role: "user",
    solvedProblemIds: [15],
    solvedCount: 1,
  },
  {
    username: "user16",
    email: "user16@mail.com",
    password: "password123",
    role: "user",
    solvedProblemIds: [16],
    solvedCount: 1,
  },
  {
    username: "user17",
    email: "user17@mail.com",
    password: "password123",
    role: "user",
    solvedProblemIds: [17],
    solvedCount: 1,
  },
  {
    username: "user18",
    email: "user18@mail.com",
    password: "password123",
    role: "user",
    solvedProblemIds: [18],
    solvedCount: 1,
  },
];

async function seedUsers() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    await User.deleteMany({});
    console.log("Old users removed");

    await User.insertMany(users);
    console.log("✅ Users seeded successfully");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding users:", err);
    process.exit(1);
  }
}

seedUsers();
