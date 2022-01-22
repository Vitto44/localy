const User = require("../models/users.model");

const authMiddleware = async (req, res, next) => {
  try {
    console.log(req.session);
    const { sid } = req.session;
    //TODO change to findbyID
    const user = await User.findOne({ where: { id: uid } });
    if (!user) {
      return res.status(404).send("Need to login!");
    } else {
      console.log(" ===============>working!<===================");
      next();
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
};

module.exports = authMiddleware;
