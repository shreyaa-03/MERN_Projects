const cron = require("node-cron");
const emailVerificationJob = require("./emailVerificationJob");

const initializeCronJobs = () => {
  cron.schedule(process.env.EMAIL_VERIFICATION_CRON, emailVerificationJob); // Initialize the email verification job
};

module.exports = initializeCronJobs;
