const transaction = require("../models/Transaction");
const responseHandler = require("../utils/response-handler");
require("dotenv").config();
const joi = require("joi");

exports.transaction = async (req, res, next) => {
  try {
    let slotId = req.params.slot_id;
    let vehicalType = req.body.data;
    let userid = req.body.userId;
    let amount = req.body.amount;
    let transactionId = req.body.transactionId;
    await transaction.create({
      userId: userid,
      slotType: vehicalType,
      slotId: slotId,
      Amount: amount,
      Transaction_id: transactionId,
    });
    res.json({ status: true });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
