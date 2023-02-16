import { DataTypes, literal } from "sequelize";

module.exports = (sequelize: any) => {
  // defino el modelo
  sequelize.define(
    "catalogs",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: literal("gen_random_uuid()"),
        allowNull: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createt_at: {
        type: DataTypes.DATE,
        defaulValue: literal("CURRENT_TIMESTAMP"),
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
