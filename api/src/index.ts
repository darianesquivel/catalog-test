import database from "./db";
import express from "express";
import routes from "./routes";

const server = express();

server.use("/", routes);
require("dotenv").config();

//const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

database.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at " + 3001);
  });
});
