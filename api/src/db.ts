import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";
require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const localhost = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);
// The constant below will have localhost || production config
const database = localhost;
const basename = path.basename(__filename);

const modelDefiners: any[] = [];

// We take each defined model and create each one passing the the sequelize instance as param
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(database));

// Relationships - refactor
const { product, catalogs, images } = database.models;

catalogs.hasMany(product, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
product.belongsTo(catalogs);
product.hasMany(images, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
images.belongsTo(product, {
  foreignKey: {
    allowNull: false,
  },
});

export default database;
