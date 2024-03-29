const mongoose = require("mongoose");

const AttendeeSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DoboEvent",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
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
  seats: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Attendees", AttendeeSchema);
