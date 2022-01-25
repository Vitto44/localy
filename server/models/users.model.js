"use strict";
const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require(".");
class User extends Model {
}
User.init({
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
}, { sequelize });
module.exports = User;
