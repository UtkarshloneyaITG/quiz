const User = require("../model/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtToken = process.env.JWT_S;

exports.registerUser = async (req, res) => {
  const { fullName, email, phoneNumber, userClass, password } = req.body;

  const userEamilAllreadyExixt = await User.findOne({ email });
  const userPhoneNumberAllreadyExixt = await User.findOne({ phoneNumber });

  if (userEamilAllreadyExixt || userPhoneNumberAllreadyExixt) {
    return res.status(400).json({
      msg: "user allready esixt",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    fullName,
    email,
    phoneNumber,
    userClass,
    password: hashPassword,
  });

  const token = jwt.sign(
    {
      id: newUser._id,
    },
    jwtToken
  );

  res.cookie("token", token);

  res.status(201).json({
    msg: "user register successfully",
    userData: {
      _id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
      userClass: newUser.userClass,
      token,
    },
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const myUser = await User.findOne({
    email,
  });

  if (!myUser) {
    return res.status(400).json({
      msg: "invalid email or password",
    });
  }

  const invalidPassword = await bcrypt.compare(password, myUser.password);

  if (!invalidPassword) {
    return res.status(400).json({
      msg: "invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: myUser._id,
    },
    jwtToken
  );

  res.cookie("token", token);

  res.status(201).json({
    msg: "user login successfully",
    userData: {
      _id: myUser._id,
      email: myUser.email,
      fullName: myUser.fullName,
      userClass: myUser.userClass,
      token,
    },
  });
};

exports.logOutUsre = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    msg: "user logout successfully",
  });
};

exports.dashboard = async (req, res) => {
  const { email } = req.body;

  const myUser = await User.findOne({
    email,
  });

  if (!myUser) {
    return res.status(400).json({
      msg: "user not valid",
    });
  }

  res.status(201).json({
    msg: "user data",
    userData: {
      _id: myUser._id,
      email: myUser.email,
      fullName: myUser.fullName,
      userClass: myUser.userClass,
      scoreHistory: myUser.scoreHistory,
      phoneNumber: myUser.phoneNumber,
    },
  });
};
