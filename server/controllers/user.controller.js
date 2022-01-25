"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User.findOne({
            where: {
                email: email,
            },
        });
        if (user) {
            return res
                .status(409)
                .send({ error: "409", message: "Invalid e-mail and/or password" });
        }
        const hash = yield bcrypt.hash(password, 10);
        const newUser = yield User.create(Object.assign(Object.assign({}, req.body), { password: hash }));
        req.session.uid = newUser.id;
        res.status(201).send(newUser);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: "400", message: "Could not create user" });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email) {
            res.sendStatus(202);
        }
        else {
            const { email, password } = req.body;
            const user = yield User.findOne({
                where: {
                    email: email,
                },
            });
            if (yield bcrypt.compare(password, user.password)) {
                if (req.session.uid != "undefined") {
                    req.session.uid = user.id;
                }
                res.status(202).send({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                });
            }
            else {
                throw new Error();
            }
        }
    }
    catch (error) {
        console.log(error);
        res
            .status(401)
            .send({ error: "401", message: "Username or password is incorrect" });
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy((error) => {
        if (error) {
            res
                .status(500)
                .send({ error, message: "Could not log out, please try again" });
        }
        else {
            res.clearCookie("sid");
            res.status(200).send({ message: "Logout successful" });
        }
    });
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body.input;
    const user = yield User.findOne({
        where: {
            email: email,
        },
    });
    if (!user) {
        return res.status(404).send({ error: "404", message: "No user" });
    }
    try {
        yield user.destroy();
        res.status(200).send("User deleted");
    }
    catch (error) {
        res.status(400).send({ error: "400", message: "Could not delete user" });
    }
});
module.exports = { create, login, logout, deleteUser };
