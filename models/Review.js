const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
    },
    bookAt: {
      type: Date,
    },
    tourName: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
