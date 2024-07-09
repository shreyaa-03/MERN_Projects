const express = require("express");
const dotenv = require("dotenv").config();
const logger = require("morgan");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const initializeCronJobs = require("./jobs/cronJob");
const cors = require("cors");
const session = require("./config/sessionConfig");
const passport = require("passport");
const passportHandler = require("./middleware/passportHandler");

connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use(session);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/user", require("./routes/userRoutes"));

// Error handling middleware
app.use(errorHandler);

// Initialize cron jobs
initializeCronJobs();

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
