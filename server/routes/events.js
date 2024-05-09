const express = require("express");
const router = express.Router();
const Event = require("../schemas/eventInfo");
const Attendee = require("../schemas/attendees");
const verifyToken = require("../middleware");

// creates a new event
router.post("/new", verifyToken, async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating event", error: error.message });
  }
});

// gets all events
router.get("/get-all", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving events", error: error.message });
  }
});

// deletes event
router.delete("/delete-event", verifyToken, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.body.eventId);
    const attendeeIds = req.body.attendeeIds;

    // delete all associated attendees
    for (let attendee of attendeeIds) {
      await Attendee.findByIdAndDelete(attendee);
    }

    res.status(200).json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting event", error: error.message });
  }
});

// updates event changes
router.put("/update-event", verifyToken, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });

    if (!event) {
      return res.status(404).send("Event not found");
    }

    res.status(200).json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating event", error: error.message });
  }
});

module.exports = router;
