import database from "./db";
import express from "express";
import cors from "cors";
import routes from "./routes";
import morgan from "morgan";

const server = express();
server.use(morgan("dev"));

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

const PORT = process.env.PORT || 3001;

server.use("/", routes);
require("dotenv").config();

database.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log("%s listening at " + PORT);
  });
});
