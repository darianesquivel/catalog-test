import { DataTypes, literal } from "sequelize";

module.exports = (sequelize: any) => {
  // defino el modelo
  sequelize.define(
    "images",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: literal("gen_random_uuid()"),
        allowNull: true,
        unique: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaulValue: new Date(),
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
