const User = require("../model/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Ans = require("../model/answerModel");
require("dotenv").config();

const jwtToken = process.env.JWT_S;

exports.registerUser = async (req, res) => {
  const { fullName, email, phoneNumber, userClass, password, role } = req.body;

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
    role,
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
      scoreHistory: newUser.scoreHistory,
      token,
      role: newUser.role,
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
      scoreHistory: myUser.scoreHistory,
      role: myUser.role,
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

  const scoreHistory = await Ans.findOne({ Email: email });

  console.log(scoreHistory);

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
      scoreHistory,
      phoneNumber: myUser.phoneNumber,
    },
  });
};

exports.Deleteuser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.body._id);
    if (!deletedUser) {
      return res.status(404).json({ msg: "User Not Found" });
    } else {
      res
        .status(200)
        .json({ msg: `User ${deletedUser.fullName} Successfully` });
    }
  } catch (error) {
    console(error);
  }
};

exports.UsersFetchingData = async (req, res, next) => {
  try {
    const { role } = req.body;
    const Users = await User.find({ role: role });
    res.json({
      message: "Fetched",
      Users,
    });
  } catch (error) {
    next(error);
  }
};

exports.AddAdmin = async (req, res, next) => {
  try {
    const { fullName, email, phoneNumber, password } = req.body;

    const userEamilAllreadyExixt = await User.findOne({ email });
    const userPhoneNumberAllreadyExixt = await User.findOne({ phoneNumber });

    if (userEamilAllreadyExixt || userPhoneNumberAllreadyExixt) {
      return res.status(400).json({
        msg: "Admin allready esixt",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      phoneNumber,
      userClass: 12,
      password: hashPassword,
      role: "admin",
    });

    res.status(201).json({
      message: "Admin created successfully",
      user: {
        fullName: newUser.fullName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
        userClass: newUser.userClass,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { _id, ...updatedata } = req.body;

    if (!_id) {
      return res.status(400).json("Fiead Id is require for process");
    }

    const updateUser = await User.findByIdAndUpdate(_id, updatedata, {
      new: true,
    });

    if (!updateUser) {
      return res.status(400).json({ message: "User Not Found" });
    }
    res.json({
      msg: "user updated successfully",
      updateUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.FindUser = async (req, res, next) => {
  try {
    const userEmaill = await User.findOne({ email: req.body.email });
    console.log(userEmaill);

    if (!userEmaill) {
      return res.status(404).json({ msg: "User Not Found" });
    } else {
      res
        .status(200)
        .json({ msg: "User Found Successfully", user: userEmaill });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { _id, oldPassword, ...updatedata } = req.body;
    const { email } = req.body;
    const checkPassword = await User.findOne({
      email,
    });

    let updateUser;
    const newPassword = await bcrypt.compare(
      oldPassword,
      checkPassword.password
    );
    console.log(oldPassword, newPassword);
    if (!_id) {
      return res.status(400).json("Fiead Id is require for process");
    }

    if (newPassword) {
      updateUser = await User.findByIdAndUpdate(_id, updatedata, {
        new: true,
      });

      if (!updateUser) {
        return res.status(400).json({ message: "User Not Found" });
      }

      return res.json({
        msg: "user updated successfully",
        updateUser,
      });
    }
    return res.json({ password: "missmatch" });
  } catch (error) {
    next(error);
  }
};

exports.FindUser = async (req, res, next) => {
  try {
    const userEmaill = await User.findOne({ email: req.body.email });
    console.log(userEmaill);

    if (!userEmaill) {
      return res.status(404).json({ msg: "User Not Found" });
    } else {
      res
        .status(200)
        .json({ msg: "User Found Successfully", user: userEmaill });
    }
  } catch (error) {
    next(error);
  }
};

exports.getLeaderBord = async (req, res, next) => {
  try {
    let users = await User.find().sort(scoreHistory.length > 0);

    // users = users.filter(user => user.scoreHistory.length > 0);
    console.log(users);

    // for (let user of users) {
    //   let total = 0;
    //   for (let record of user.scoreHistory) {
    //     total += record.score;
    //   }
    //   user.totalScore = total; // add totalScore property
    // }

    // // Sort descending by totalScore
    // users = users.sort((a, b) => b.totalScore - a.totalScore);

    res.json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const user = await User.findOne({ _id: userId });

    res.status(200).json({
      msg: "user find successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteAccByEamil = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log(email);

    const user = await User.findOne({ email });

    const invalidPassword = await bcrypt.compare(password, user.password);

    if (!invalidPassword) {
      return res.status(400).json({
        msg: "invalid email or password",
      });
    }

    await User.deleteOne({ email });

    res.status(200).json({
      msg: "your account deleted succsefully",
    });
  } catch (error) {
    next(error);
  }
};
