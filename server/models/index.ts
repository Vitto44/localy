import { Options, Sequelize } from "sequelize";
const config: Options = {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
};

const sequelize = new Sequelize("localydb", "postgres", "0000", config);

export default sequelize;
