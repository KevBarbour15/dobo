const express = require("express");
const router = express.Router();
const Attendee = require("../schemas/attendees");
const Event = require("../schemas/eventInfo");

// creates a new attendee
router.post("/new", async (req, res) => {
  try {
    const attendee = new Attendee(req.body);
    const savedAttendee = await attendee.save();

    const eventId = req.body.eventId;
    await Event.findByIdAndUpdate(eventId, {
      $push: { attendees: savedAttendee._id },
    });

    res.status(201).json(savedAttendee);
    console.log("Attendee added");
  } catch (error) {
    console.log("Error creating attendee");
    res
      .status(500)
      .json({ message: "Error creating attendee", error: error.message });
  }
});

// gets all attendees by the eventId
router.post("/get-by-ids", async (req, res) => {
  try {
    const attendeeIds = req.body.attendeeIds;
    const attendees = await Attendee.find({ _id: { $in: attendeeIds } });
    res.status(200).json(attendees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching attendees", error: error.message });
  }
});

router.put("/update-status", async (req, res) => {
  let { status, ogStatus, attendeeId, eventId, seats } = req.body;
  seats = parseInt(seats, 10); // Ensure seats is an integer

  console.log("Seats: " + seats);
  try {
    // Update attendee's status
    await Attendee.findByIdAndUpdate(attendeeId, { status, seats });

    // Handle seat allocation for "Confirmed" status
    if (status === "Confirmed" && ogStatus !== "Confirmed") {
      // Decrement event's available seats
      await Event.findByIdAndUpdate(eventId, {
        $inc: { seatsRemaining: -seats },
      });
    }

    // Handle returning seats when moving away from "Confirmed"
    if (status !== "Confirmed" && ogStatus === "Confirmed") {
      // Increment event's available seats
      await Event.findByIdAndUpdate(eventId, {
        $inc: { seatsRemaining: seats },
      });
    }

    res.status(200).json({ message: "Attendee status updated" });
  } catch (error) {
    res.status(500).json({
      message: "Error updating attendee status",
      error: error.message,
    });
  }
});

module.exports = router;
