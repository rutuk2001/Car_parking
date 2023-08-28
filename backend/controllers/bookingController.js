const Booking = require("../models/booking");
const slot = require("../models/bookingSlot");
const responseHandler = require("../utils/response-handler");
require("dotenv").config();
const joi = require("joi");

exports.parkingBooking = async (req, res, next) => {
  try {
    const { vehicleType, timefrom, timeto } = req.body;
    const validationSchema = joi.object().keys({
      vehicleType: joi.string().required(),
      timefrom: joi.string().required(),
      timeto: joi.string().required(),
    });
    const result = validationSchema.validate(req.body);
    if (result.error) {
      return responseHandler.generateError(
        res,
        "Validation failed",
        result.error
      );
    }
    let bookingSlots = await Booking.find({
      vehical_type: vehicleType,
      $or: [
        { Time_From: { $gte: timefrom, $lte: timeto } },
        {
          Time_to: { $gte: timefrom, $lte: timeto },
        },
        {
          $and: [
            { Time_From: { $lte: timefrom } },
            { Time_to: { $gte: timeto } },
          ],
        },
      ],
    }).select("slots");
    const roomIds = bookingSlots.map((i) => i.slots?.toString());
    const availableSlots = await slot.find(
      {
        _id: {
          $nin: roomIds,
        },
        slotType: vehicleType,
      },
      { __v: 0, createdAt: 0, updatedAt: 0 }
    );

    res.json(availableSlots);
  } catch (err) {
    next(err);
  }
};

exports.getSlots = async (req, res, next) => {
  try {
    let vechicalType = req.params.vehicleType;
    let totalSlots = await slot.find({ slotType: vechicalType });
    res.json(totalSlots);
  } catch {
    res.json(Error);
  }
};

exports.bookSlot = async (req, res, next) => {
  try {
    let slotId = req.params.id;
    let booking = req.body.data;
    let userid = req.body.userId;
    await Booking.create({
      user_id: userid,
      vehical_type: booking.vehicleType,
      Time_From: booking.timefrom,
      Time_to: booking.timeto,
      slots: slotId,
    });
    res.json({ status: true, message: "booked" });
  } catch {
    res.json({ status: false, message: "something went wrong" });
  }
};

exports.checkout = async (req, res) => {
  try {
    let bookingId = req.params.id;
    await Booking.findByIdAndDelete(bookingId);
    res.json({ status: true, message: "delete" });
  } catch {
    res.json({ status: false, message: "something went wrong" });
  }
};

exports.getYearData = async (req, res) => {
  try {
    let userId = req.params.id;
    let year = req.body.data;
    const data = await Booking.find({ user_id: userId });
    const year_data = [];
    data.map((res) => {
      let date = new Date(res.Time_From);
      if (date.getFullYear() == year) {
        year_data.push(res);
      }
    });
    return res.status(200).send({ err: 1, data: year_data });
  } catch (error) {}
};
