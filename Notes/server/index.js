const express = require("express");
const dotenv = require("dotenv").config();
const logger = require("morgan");
const connectDb = require("./config/dbConnection");
connectDb();
const initializeCronJobs = require("./jobs/cronJob");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use("/user", require("./routes/userRoutes"));

initializeCronJobs();

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
