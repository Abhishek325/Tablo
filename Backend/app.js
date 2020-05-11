const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const tableRouter = require("./routes/table");
const dataRouter = require("./routes/data");

app.use("/table", tableRouter);
app.use("/data", dataRouter);

app.listen(3000);
