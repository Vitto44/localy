"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize_typescript_1 = require("sequelize-typescript");
// declare shop class
module.exports = (sequelize, DataTypes) => {
    class Shop extends sequelize_typescript_1.Model {
        static associate(models) {
            Shop.belongsTo(models.User);
        }
    }
    Shop.init({
        id: {
            type: sequelize_1.default.UUID,
            primaryKey: true,
            defaultValue: sequelize_1.default.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telephone: DataTypes.BIGINT,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        website: DataTypes.STRING,
        description: DataTypes.STRING,
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        products: DataTypes.ARRAY(sequelize_1.default.TEXT),
        picture: DataTypes.ARRAY(sequelize_1.default.TEXT),
    }, { sequelize });
    return Shop;
};
