import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  // defino el modelo
  sequelize.define(
    "catalogs",
    {
      id: {
        type: DataTypes.UUID,

        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
        defaulValue: DataTypes.NOW,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
