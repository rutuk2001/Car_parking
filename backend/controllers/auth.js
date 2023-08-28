const User = require("../models/users");
const bcrypt = require("bcrypt");
const joi = require("joi");
const responseHandler = require("../utils/response-handler");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, mobno, password } = req.body;
    const validationSchema = joi.object().keys({
      username: joi.string().required(),
      email: joi.string().required(),
      mobno: joi.string().required(),
      password: joi.string().required(),
    });
    const result = validationSchema.validate(req.body);
    if (result.error) {
      return responseHandler.generateError(
        res,
        "Validation failed",
        result.error
      );
    }
    let user = await User.findOne({ Email: email });
    if (user) {
      return res.json({
        status: false,
        msg: "This email has been registered!",
      });
    }
    console.log(user);

    const hash = bcrypt.hashSync(password, saltRounds);

    await User.create({
      Username: username,
      Email: email,
      mobno: mobno,
      Password: hash,
    });
    res.json({ status: true, message: "Registered Successfully" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res) => {
  try {
    const data = req.body;
    console.log(data.username, "data");
    let user = await User.findOne({ Email: data.username });
    console.log(user, "user");
    if (!user) {
      return res.json({
        status: false,
        message: "This mail is not Registered.",
      });
    }
    const validPassword = bcrypt.compare(data.password, user.Password);

    if (!validPassword) {
      return res.json({ status: false, message: "Invalid Credentials!" });
    }

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60, //dividing into miliseconds
        _id: user._id,
        name: user.Username,
      },
      process.env.SECRET //secret key
    );

    res.json({
      status: true,
      token: token,
      userId: user._id,
      userName: user.Username,
    });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
