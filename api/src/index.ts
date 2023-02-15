const express = require("express");
const catalogs = require("./routes");
const app = express();

app.use("/", catalogs);
app.listen(3001, () => console.log("running"));
