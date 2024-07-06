const express = require("express");
const dotenv = require("dotenv").config();
const logger = require("morgan");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const initializeCronJobs = require("./jobs/cronJob");
const cors = require("cors");
const cookieSession = require("cookie-session");
// const session = require("./config/sessionConfig");
const passport = require("passport");
require("./middleware/passportHandler"); // Initialize passport configuration

connectDb(); // Connect to the database

const app = express();

// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

// Session setup
// app.use(session);
app.use(
  cookieSession({
    name: "session",
    keys: ["somesessionkey"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

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
