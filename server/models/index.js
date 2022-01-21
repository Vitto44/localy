const { Sequelize } = require("sequelize");

const config = {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
};

const sequelize = new Sequelize("localydb", "postgres", "0000", config);

module.exports = sequelize;
