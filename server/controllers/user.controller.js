const User = require("../models/users.model");
const bcrypt = require("bcrypt");

const create = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      return res
        .status(409)
        .send({ error: "409", message: "Invalid e-mail and/or password" });
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hash });
    console.log("LOG =>=>=>=>=>=>=>=>>>", req.session);
    req.session.uid = newUser.id;
    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "400", message: "Could not create user" });
  }
};

const login = async (req, res) => {
  try {
    if (!req.body.email) {
      //used as an auth function
      res.sendStatus(202);
    } else {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (await bcrypt.compare(password, user.password)) {
        req.session.uid = user.id;
        res.status(202).send({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });
      } else {
        throw new Error();
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ error: "401", message: "Username or password is incorrect" });
  }
};

const logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res
        .status(500)
        .send({ error, message: "Could not log out, please try again" });
    } else {
      res.clearCookie("sid");
      res.status(200).send({ message: "Logout successful" });
    }
  });
};

const deleteUser = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res.status(404).send({ error: "404", message: "No user" });
  }
  try {
    await user.destroy();
    res.status(200).send("User deleted");
  } catch (error) {
    res.status(400).send({ error: "400", message: "Could not delete user" });
  }
};

module.exports = { create, login, logout, deleteUser };
