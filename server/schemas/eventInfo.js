const mongoose = require('mongoose'); 

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
    required: false,
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attendees'
  }],
});

module.exports = mongoose.model('DoboEvent', DoboEventSchema);