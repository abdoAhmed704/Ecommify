const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Coupon name is required"],
      unique: true,
    },
    expireAt: {
      type: Date,
      required: [true, "Coupon's expire time is required"],
    },
    discount: {
      type: Number,
      required: [true, "Coupon's discount value is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
