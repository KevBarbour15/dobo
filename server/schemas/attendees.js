const mongoose = require("mongoose");

const AttendeeSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DoboEvent",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Confirmed", "Inquired", "Contacted", "Not Attending"],
  },
  inquiryDate: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Attendees", AttendeeSchema);
