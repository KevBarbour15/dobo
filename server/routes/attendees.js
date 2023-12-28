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
  let status = req.body.status;
  let ogStatus = req.body.ogStatus;
  let attendeeId = req.body.attendeeId;
  let eventId = req.body.eventId;
  let seats = req.body.seats;

  try {
    await Attendee.findByIdAndUpdate(attendeeId, { status });

    // If the status changes to "Confirmed" from either "Inquired", "Not Attending", or "Contacted"
    if (
      status === "Confirmed" &&
      (ogStatus === "Inquired" ||
        ogStatus === "Not Attending" ||
        ogStatus === "Contacted")
    ) {
      // Decrement seats as the attendee is now confirmed
      await Event.findByIdAndUpdate(eventId, {
        $inc: { seatsRemaining: -seats },
      });
    }

    // If the status changes from "Confirmed" to either "Inquired", "Not Attending", or "Contacted"
    if (status !== "Confirmed" && ogStatus === "Confirmed") {
      await Event.findByIdAndUpdate(eventId, {
        $inc: { seatsRemaining: seats },
      });
    }

    console.log("Attendee status updated");
    res.status(200).json({ message: "Attendee status updated" });
  } catch (error) {
    console.log("Error updating attendee status");
    console.log(error);
    res.status(500).json({
      message: "Error updating attendee status",
      error: error.message,
    });
  }
});

module.exports = router;
