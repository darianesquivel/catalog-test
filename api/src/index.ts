import database from "./db";
import express from "express";
import cors from "cors";
import routes from "./routes";

const server = express();

const allowedOrigins = [
  "https://catalogtest.vercel.app",
  "http://localhost:3000",
];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
server.use(cors(options));
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from. * -> autoriza los requests de cualquier puerto

  res.header("Access-Control-Allow-Credentials", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, *"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
const PORT = process.env.PORT || 3001;

server.use("/", routes);
require("dotenv").config();

database.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log("%s listening at " + PORT);
  });
});
