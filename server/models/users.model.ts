// const { Sequelize } = require("sequelize");
// import { Model } from "sequelize-typescript";

// interface UserInterface {
//   id: String;
//   firstName: String;
//   lastName: string;
//   email: string;
//   password: string;
// }

// // declare shop class
// module.exports = (sequelize: any, DataTypes: any) => {
//   class User extends Model<UserInterface> implements UserInterface {
//     declare id: String;
//     declare firstName: String;
//     declare lastName: string;
//     declare email: string;
//     declare password: string;

//     declare readonly createdAt: Date;
//     declare readonly updatedAt: Date;

//     static associate(models: any) {
//       User.hasMany(models.Shop);
//     }
//   }
//   User.init(
//     {
//       id: {
//         type: Sequelize.UUID,
//         primaryKey: true,
//         defaultValue: Sequelize.UUIDV4,
//       },
//       firstName: DataTypes.STRING,
//       lastName: DataTypes.STRING,
//       email: DataTypes.STRING,
//       password: DataTypes.STRING,
//     },
//     { sequelize }
//   );

//   return User;
// };
///////////////////////////////////////////////////

import {
  Association,
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
  Model,
  Optional,
  DataTypes,
  Sequelize,
} from "sequelize";
import { Shop } from "./shops.model";
import { sequelize } from "./index";

interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public readonly shops?: Shop[];

  public static associations: {
    shops: Association<User, Shop>;
  };
}

User.init(
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    tableName: "users",
    sequelize,
  }
);

User.hasMany(Shop, {
  sourceKey: "id",
  foreignKey: "UserId",
  as: "shops",
});
