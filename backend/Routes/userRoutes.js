const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const bookingController = require("../controllers/bookingController");
const transactionController = require("../controllers/transactionController");
const userController = require("../controllers/userController");
const { jWtAuth } = require("../middleware/tokenAuth");
// const jwTokenAuth = require("../middleware/tokenAuth");

router.post("/registerUSer", authController.registerUser);
router.post("/userLogin", authController.login);
router.post("/checkAvailability", jWtAuth, bookingController.parkingBooking);
router.get("/getSlots/:vehicleType", jWtAuth, bookingController.getSlots);
router.post("/bookSlot/:id", jWtAuth, bookingController.bookSlot);
router.post(
  "/transaction/:slot_id",
  jWtAuth,
  transactionController.transaction
);
router.get("/getUserData/:id", jWtAuth, userController.userData);
router.get("/getUser/:id", jWtAuth, userController.user);
router.get("/checkout/:id", jWtAuth, bookingController.checkout);
router.post("/filter/:id", jWtAuth, bookingController.getYearData);
module.exports = router;
