const express = require("express");
const router = express.Router();
const Attendee = require("../schemas/attendees");
const Event = require("../schemas/eventInfo");

// creates a new attendee
router.post("/new", async (req, res) => {
  // use NodeMailer to send an email to the Dobo notifying them of the new inquiry
  // use Mandrill to send an email to the attendee notifying them of their inquiry (maybe???)

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

// changes the status of an attendee (maybe use Mandrill for this when their spot is confirmed?)

router.put("/update-status", async (req, res) => {
  let status = req.body.status;
  let ogStatus = req.body.ogStatus;

  try {
    await Attendee.findByIdAndUpdate(attendeeId, { status });

    if (status === "Confirmed" && ogStatus === "Inquired/Not Attending") {
      // notify user their spot is confirmed

      const event = await Event.findByIdAndUpdate(eventId, {
        $inc: { seatsRemaining: -1 },
      });
    }

    if (status === "Inquired/Not Attending" && ogStatus === "Confirmed") {
      const event = await Event.findByIdAndUpdate(eventId, {
        $inc: { seatsRemaining: 1 },
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
