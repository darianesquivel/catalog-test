import database from "./db";
import express from "express";
import routes from "./routes";

const server = express();

server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from. * -> autoriza los requests de cualquier puerto

  res.header("Access-Control-Allow-Credentials", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use("/", routes);
require("dotenv").config();

database.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at " + 3001);
  });
});
