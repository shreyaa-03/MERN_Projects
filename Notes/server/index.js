const express = require("express");
const dotenv = require("dotenv").config();
const logger = require("morgan");
const connectDb = require("./config/dbConnection");
connectDb();
const errorHandler = require("./middleware/errorHandler");
const initializeCronJobs = require("./jobs/cronJob");
const cors = require("cors");
const session = require("./config/sessionConfig");
const passport = require("passport");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use("/user", require("./routes/userRoutes"));
app.use("/auth", require("./routes/googleAuthRoutes"));
app.use(errorHandler);
app.use(session);
app.use(passport.session());
app.use(passport.initialize());

initializeCronJobs();

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
