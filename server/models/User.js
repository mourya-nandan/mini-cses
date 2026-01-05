const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      index: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
      index: true,
    },

    password: {
      type: String,
      select: false, // Security: Never return password by default
      // Not required: true, because OAuth users (Google/GitHub) won't have one initially
    },

    // OAuth Providers (Sparse Index: Unique only if value exists)
    googleId: {
      type: String,
      unique: true,
      sparse: true,
      select: false,
    },

    githubId: {
      type: String,
      unique: true,
      sparse: true,
      select: false,
    },

    // User Profile (Separation of Concerns)
    profile: {
      displayName: { type: String },
      avatar: { type: String }, // URL to image
      bio: { type: String, maxlength: 160 },
      website: { type: String },
    },

    // Gamification & Progress
    solvedProblemIds: {
      type: [Number], // Storing Problem 'id' (legacy integer), not ObjectId
      default: [],
    },

    solvedCount: {
      type: Number,
      default: 0,
      index: -1, // Optimized for Leaderboard (Descending sort)
    },

    // RBAC (Role Based Access Control)
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },

    // Account Status (Security & Moderation)
    isVerified: {
      type: Boolean,
      default: false, // For Email Verification flow
    },

    status: {
      type: String,
      enum: ["active", "banned", "suspended"],
      default: "active",
    },

    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true, // Creates createdAt & updatedAt automatically
  }
);

// --- ENTERPRISE ADDITIONS ---

// 1. Index for Leaderboard (Descending)
userSchema.index({ solvedCount: -1 });

// 2. Pre-save Hook: Hash Password automatically
// FIXED: Removed 'next' callback. Using pure async/await for Mongoose 7+.
userSchema.pre("save", async function () {
  // Only hash if password was modified (or is new)
  if (!this.isModified("password") || !this.password) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    throw err; // Mongoose will catch this rejected promise
  }
});

// 3. Instance Method: Compare Password
userSchema.methods.comparePassword = async function (candidatePassword) {
  // Since password is 'select: false', we need to ensure it's available 
  // when calling this method from the route.
  return bcrypt.compare(candidatePassword, this.password);
};

// 4. Instance Method: Check if user has password (for OAuth users)
userSchema.methods.hasPassword = function () {
  return !!this.password;
};

module.exports = mongoose.model("User", userSchema);