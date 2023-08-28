const mongoose = require("mongoose");

const slotsSchema = new mongoose.Schema(
  {
    slotId: {
      type: String,
      required: true,
    },
    slotType: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("slots", slotsSchema);
