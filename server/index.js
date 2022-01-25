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
const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");
const router = require("./router");
const sequelize = require("./models/index");
const session = require("express-session");
const SECRET = process.env.SECRET || "this is not very secure";
const corsConfig = {
    origin: "http://localhost:3000",
    credentials: true,
};
app.use(cors(corsConfig));
app.use(express.json({ limit: "50mb" }));
app.use(session({
    // the store property, if not specified, defaults to the in-memory store
    name: "sid",
    saveUninitialized: false,
    resave: false,
    secret: SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60,
        sameSite: true,
        httpOnly: false,
        // we would want to set secure=true in a production environment
        secure: false,
    },
}));
app.use(router);
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize.sync();
    app.listen(PORT, () => {
        console.log(`Server up and running on http://localhost:${PORT}`);
    });
    // app.on("close", () => sequelize.close());
}))();
module.exports = app;
