const express = require("express");
const dotenv = require("dotenv").config();
const logger = require("morgan");
const cors = require("cors");
const ConnectDB = require("./config/db_connection");
ConnectDB();

const app = express();
app.use(cors());
app.use(express.json()); // data posted in form of json data
app.use(express.urlencoded({ extended: true })); // data recieved from html forms
app.use(logger("dev"));

app.use("/api", require("./routes/todoRoutes"));

const port = process.env.PORT || 4200;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
