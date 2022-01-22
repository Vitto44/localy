const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require(".");
const User = require("./users.model");

class Shop extends Model {}

Shop.init(
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      notNull: true,
    },
    category: {
      type: DataTypes.STRING,
      notNull: true,
    },
    address: {
      type: DataTypes.STRING,
      notNull: true,
    },
    telephone: DataTypes.BIGINT,
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      notNull: true,
    },
    website: DataTypes.STRING,
    description: DataTypes.STRING,
    latitude: {
      type: DataTypes.FLOAT,
      notNull: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      notNull: true,
    },
    products: DataTypes.ARRAY(Sequelize.TEXT),
    picture: DataTypes.ARRAY(Sequelize.TEXT),
  },
  { sequelize }
);

Shop.belongsTo(User);
User.hasMany(Shop);

module.exports = Shop;
