import database from "./db";
import express from "express";
import routes from "./routes";

const server = express();

server.use("/", routes);
require("dotenv").config();

database.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at " + 3001);
  });
});
