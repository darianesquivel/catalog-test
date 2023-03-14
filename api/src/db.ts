import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";
require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
console.log("process. env ----->", process.env)
const localhost = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);
// Production conection
const production = new Sequelize({
  database: DB_NAME,
  dialect: "postgres",
  host: DB_HOST,
  port: 5432,
  username: DB_USER,
  password: DB_PASSWORD,
  pool: {
    max: 3,
    min: 1,
    idle: 10000,
  },
  dialectOptions: {
    ssl: {
      require: true,
      // Ref.: https://github.com/brianc/node-postgres/issues/2009
      rejectUnauthorized: false,
    },
    keepAlive: true,
  },
  ssl: true,
});
// The constant below will have localhost || production config
const database = process.env.NODE_ENV === "production" ? production : localhost;
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
