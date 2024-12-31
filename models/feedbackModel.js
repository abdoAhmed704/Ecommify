const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    rates: {
      type: Number,
      min: [1, "Min rate value is ==> 1"],
      max: [5, "Max rate value is ==> 5"],
      required: [true, "Feedback ratings is required"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Feedback must belong to User"],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Feedback must belong to a Product"],
    },
  },
  { timestamps: true }
);

//@desc		to populate  to user (To show the user's name and image)
feedbackSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name profileImage" });
  next();
});

module.exports = mongoose.model("Feedback", feedbackSchema);
