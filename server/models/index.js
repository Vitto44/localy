const { Sequelize } = require("sequelize");
require("dotenv").config();

const config = {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
};

const sequelize = new Sequelize(
  "localydb",
  "postgres",
  "codecloudnine",
  config
);

console.log(process.env.DB_PASSWORD);

module.exports = sequelize;
