const express = require("express");
const dotenv = require("dotenv").config();
const logger = require("morgan");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const initializeCronJobs = require("./jobs/cronJob");
const cors = require("cors");
const session = require("./config/sessionConfig"); // Import the session configuration
const passport = require("passport");
require("./middleware/passportHandler"); // Initialize passport configuration

connectDb(); // Connect to the database

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

// Session setup
app.use(session);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/user", require("./routes/userRoutes"));
app.use("/auth", require("./routes/googleAuthRoutes"));

// Error handling middleware
app.use(errorHandler);

// Initialize cron jobs
initializeCronJobs();

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
