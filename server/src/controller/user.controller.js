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

exports.deteleSingleHistory = async (req, res, next) => {
  try {
    const { email, historyIndex } = req.body;

    const checkUserHistory = await User.findOne({ email });
    const userHistory = checkUserHistory.scoreHistory;

    if (!userHistory || userHistory.length === 0) {
      return res.status(400).json({ msg: "History is already empty" });
    }

    if (historyIndex < 0 || historyIndex >= userHistory.length) {
      return res.status(400).json({ msg: "Invalid history index" });
    }

    userHistory.splice(historyIndex, 1);

    await User.updateOne({ email }, { $set: { scoreHistory: userHistory } });

    res.status(200).json({ msg: "User history deleted successfully" });
  } catch (err) {
    next(err);
  }
};
