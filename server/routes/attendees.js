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
  let {
    status,
    ogStatus,
    attendeeId,
    eventId,
    seats,
    winePairings,
    totalPayment,
  } = req.body;
  seats = parseInt(seats, 10);
  winePairings = parseInt(winePairings, 10);
  totalPayment = parseInt(totalPayment, 10);
  console.log(totalPayment);

  try {
    const currentAttendee = await Attendee.findById(attendeeId);
    const currentSeats = currentAttendee.seats;
    const currentWinePairings = currentAttendee.winePairings;
    const currentPayment = currentAttendee.totalPayment;

    // Update attendee's status and information
    if (status === "Not Attending") {
      await Attendee.findByIdAndDelete(attendeeId);

      // Remove attendee ID from the event
      await Event.findByIdAndUpdate(eventId, {
        $pull: { attendees: attendeeId },
      });
    }

    await Attendee.findByIdAndUpdate(attendeeId, {
      status,
      seats,
      winePairings,
      totalPayment,
    });

    if (status === "Confirmed" && ogStatus !== "Confirmed") {
      await Event.findByIdAndUpdate(eventId, {
        $inc: {
          seatsRemaining: -seats,
          winePairings: winePairings,
          totalPayment: totalPayment,
        },
      });
    } else if (status === "Confirmed" && ogStatus === "Confirmed") {
      const seatDiff = seats - currentSeats;
      const winePairingDiff = winePairings - currentWinePairings;
      const paymentDiff = totalPayment - currentPayment;
      await Event.findByIdAndUpdate(eventId, {
        $inc: {
          seatsRemaining: -seatDiff,
          winePairings: winePairingDiff,
          totalPayment: paymentDiff,
        },
      });
    } else if (status !== "Confirmed" && ogStatus === "Confirmed") {
      await Event.findByIdAndUpdate(eventId, {
        $inc: {
          seatsRemaining: currentSeats,
          winePairings: -currentWinePairings,
          totalPayment: -currentPayment,
        },
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
    const winePairings = req.body.winePairings;
    const totalPayment = req.body.totalPayment;

    await Event.findByIdAndUpdate(eventId, {
      $push: { attendees: savedAttendee._id },
      $inc: {
        seatsRemaining: -seats,
        winePairings: winePairings,
        totalPayment: totalPayment,
      },
    });

    res.status(201).json(savedAttendee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating attendee", error: error.message });
  }
});

module.exports = router;
