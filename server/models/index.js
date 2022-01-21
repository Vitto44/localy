const { Sequelize } = require("sequelize");
require("dotenv").config();

const config = {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  config
);

module.exports = sequelize;
