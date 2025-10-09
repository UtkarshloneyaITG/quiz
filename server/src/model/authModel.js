const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    userClass: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    scoreHistory: [
      {
        questionAttempt: {
          correctAnswers: {
            type: Number,
            required: true,
          },
          attempt: {
            type: Number,
            required: true,
          },
        },
        score: { type: Number, required: true },
        submitedON: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
