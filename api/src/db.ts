import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";
require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const localhost = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);
// The constant below will have localhost || production config
const database = localhost;
const basename = path.basename(__filename);

const modelDefiners: any[] = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(database));

// Relationships
// const { product, catalogs } = database.models;

// catalogs.hasMany(product, { foreignKey: "id", as: "catalog" });
// product.belongsTo(catalogs, { foreignKey: "id", as: "product" });

export default database;
