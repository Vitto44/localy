const User = require("../models/users.model");

const authMiddleware = async (req, res, next) => {
  try {
    const { uid } = req.session;
    const account = await this.userRepository.findOne({ id: uid });
    if (!account) {
      return res.status(404).send("Need to login!");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
};

module.exports = authMiddleware;
