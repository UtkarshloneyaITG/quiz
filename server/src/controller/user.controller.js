const User = require("../model/authModel");

exports.deteleUserHistory = async (req, res, next) => {
  try {
    const { email } = req.body;

    const checkUserHistory = await User.findOne({ email });

    const userHistory = checkUserHistory.scoreHistory;

    if (userHistory.length === 0) {
      return res.status(400).json({ msg: "history was allready empty" });
    }

    cons;

    const user = await User.updateOne(
      { email },
      { $set: { scoreHistory: [] } }
    );
    res
      .status(200)
      .json({ message: "User history deleted successfully", user });
  } catch (err) {
    next(err);
  }
};
