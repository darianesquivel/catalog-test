"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./src/db"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./src/routes"));
const server = (0, express_1.default)();
server.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
server.use(express_1.default.json({ limit: "50mb" }));
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from. * -> autoriza los requests de cualquier puerto
    res.header("Access-Control-Allow-Credentials", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
const PORT = process.env.PORT || 3001;
server.use("/", routes_1.default);
require("dotenv").config();
db_1.default.sync({ force: true }).then(() => {
    server.listen(PORT, () => {
        console.log("%s listening at " + PORT);
    });
});
