const express = require("express");
const verifyToken = require("../middleware");
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating attendee", error: error.message });
  }
});

// gets all attendees by the eventId
router.post("/get-by-ids", verifyToken, async (req, res) => {
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

//
router.put("/update-status", verifyToken, async (req, res) => {
  let { status, ogStatus, attendeeId, eventId, seats } = req.body;
  seats = parseInt(seats, 10); // Ensure seats is an integer

  try {
    const currentAttendee = await Attendee.findById(attendeeId);
    const currentSeats = currentAttendee.seats;
    // Update attendee's status

    if (status === "Not Attending") {
      await Attendee.findByIdAndDelete(attendeeId);

      // Remove attendee ID from the event
      await Event.findByIdAndUpdate(eventId, {
        $pull: { attendees: attendeeId },
      });
    }

    await Attendee.findByIdAndUpdate(attendeeId, { status, seats });

    if (status === "Confirmed" && ogStatus !== "Confirmed") {
      await Event.findByIdAndUpdate(eventId, {
        $inc: { seatsRemaining: -seats },
      });
    } else if (status === "Confirmed" && ogStatus === "Confirmed") {
      const seatDiff = seats - currentSeats;
      await Event.findByIdAndUpdate(eventId, {
        $inc: { seatsRemaining: -seatDiff },
      });
    } else if (status !== "Confirmed" && ogStatus === "Confirmed") {
      await Event.findByIdAndUpdate(eventId, {
        $inc: { seatsRemaining: currentSeats },
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

// manually add an attendee
router.post("/add", verifyToken, async (req, res) => {
  try {
    const attendee = new Attendee(req.body);
    const savedAttendee = await attendee.save();

    const eventId = req.body.eventId;
    const seats = req.body.seats;

    await Event.findByIdAndUpdate(eventId, {
      $push: { attendees: savedAttendee._id, },
      $inc: { seatsRemaining: -seats }
    });

    res.status(201).json(savedAttendee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating attendee", error: error.message });
  }
});

module.exports = router;
