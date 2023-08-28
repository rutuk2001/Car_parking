const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    vehical_type: {
      type: String,
      require: true,
    },
    Time_From: {
      type: String,
      require: true,
    },
    Time_to: {
      type: String,
      require: true,
    },
    slots: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "slot",
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("booking", bookingSchema);
