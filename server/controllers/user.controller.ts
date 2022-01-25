import { Request, Response } from "express";
import db from "../models";
const bcrypt = require("bcrypt");

declare module "express-session" {
  interface Session {
    uid: string;
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({
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
    req.session.uid = newUser.id;
    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "400", message: "Could not create user" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    if (!req.body.email) {
      res.sendStatus(202);
    } else {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (await bcrypt.compare(password, user.password)) {
        if (req.session.uid != "undefined") {
          req.session.uid = user.id;
        }
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

const logout = async (req: Request, res: Response) => {
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

const deleteUser = async (req: Request, res: Response) => {
  const { email } = req.body.input;
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
