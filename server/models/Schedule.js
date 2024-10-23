const mongoose = require("mongoose");

const schedule = new mongoose.Schema({
  officerId: String,
  customerId: String,
  eventName: String,
  duration: String,
  location: String,
  date: String,
});
const Schedule = mongoose.model("Schedule", schedule);

module.exports = Schedule;
