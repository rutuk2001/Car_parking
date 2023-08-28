const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "slot",
      require: true,
    },
    slotType: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    Amount: {
      type: Number,
      required: true,
    },
    Transaction_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("transactions", transactionSchema);
