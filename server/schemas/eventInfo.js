const mongoose = require("mongoose");

const DoboEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  seatsRemaining: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  isPublicEvent: {
    type: Boolean,
    required: true,
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendees",
    },
  ],
});

module.exports = mongoose.model("DoboEvent", DoboEventSchema);
