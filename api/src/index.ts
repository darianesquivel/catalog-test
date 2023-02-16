import database from "./db";
import express from "express";
import routes from "./routes";

const server = express();

server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));

server.use("/", routes);
require("dotenv").config();

database.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at " + 3001);
  });
});
