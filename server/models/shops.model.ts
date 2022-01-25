import Sequelize from "sequelize";
import { Model } from "sequelize-typescript";

//create shop interface
interface ShopInterface {
  id: String;
  name: String;
  category: String;
  address: String;
  telephone: Number;
  email: String;
  website?: String;
  description?: String;
  latitude: Number;
  longitude: Number;
  products: String[];
  picture: String[];
}

// declare shop class
module.exports = (sequelize: any, DataTypes: any) => {
  class Shop extends Model<ShopInterface> implements ShopInterface {
    declare id: String;
    declare name: String;
    declare category: String;
    declare address: String;
    declare telephone: Number;
    declare email: String;
    declare latitude: Number;
    declare longitude: Number;
    declare products: String[];
    declare picture: String[];

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;

    static associate(models: any) {
      Shop.belongsTo(models.User);
    }
  }
  Shop.init(
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
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
      products: DataTypes.ARRAY(Sequelize.TEXT),
      picture: DataTypes.ARRAY(Sequelize.TEXT),
    },
    { sequelize }
  );

  return Shop;
};
