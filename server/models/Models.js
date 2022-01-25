module.exports = (sequelize, DataTypes) => {
  const Models = sequelize.define(
    "Models",
    {
      makes_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  // Models.belongsTo(Makes, { foreignKey: "makes_id" });

  return Models;
};
