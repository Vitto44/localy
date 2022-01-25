"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config = {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
};
const sequelize = new sequelize_1.Sequelize("localydb", "postgres", "0000", config);
exports.default = sequelize;
