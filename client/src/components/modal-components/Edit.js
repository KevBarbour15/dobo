import { useState } from "react";
import { convertDateReadability, formatDate } from "../../helpers/formatting.js";
import axios from "../../axiosConfig";

const EditEvent = ({ event, onClose, onUpdateEvent }) => {
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(formatDate(event.date));
  const [time, setTime] = useState(event.time);
  const [seats, setSeats] = useState(event.seats);
  const [seatsRemaining, setSeatsRemaining] = useState(event.seatsRemaining);
  const committed = event.seats - event.seatsRemaining; // orginal seats available

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);

  const incrementSeats = () => {
    setSeats(seats + 1);
    setSeatsRemaining(seatsRemaining + 1);
  };

  const decrementSeats = () => {
    if (seats > committed) {
      setSeats(seats - 1);
      setSeatsRemaining(seatsRemaining - 1);
    } else {
      alert("You cannot have less seats than attendees!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(event._id);
    const updatedEventData = {
      ...event,
      title,
      seats,
      seatsRemaining,
      date,
      time,
    };
    try {
      const response = await axios.put(
        "/events/update-event",
        updatedEventData
      );
      if (response.status === 200 || response.status === 201) {
        onUpdateEvent(response.data);
        onClose();
      } else {
        console.error("Error updating event: ", response);
      }
    } catch (error) {
      console.error("Error updating event: ", error);
    }
  };

  return (
    <div>
      <h1>{convertDateReadability(event.date)}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <div>
          <label>Seats:</label>
          <button
            type="button"
            onClick={decrementSeats}
            disabled={seats <= committed}
          >
            -
          </button>
          <input type="number" value={seats} readOnly />
          <button type="button" onClick={incrementSeats}>
            +
          </button>
          <label> People Commited: {committed}</label>
        </div>
        <label>
          Date:
          <input type="date" value={date} onChange={handleDateChange} />
        </label>
        <label>
          Time:
          <input type="time" value={time} onChange={handleTimeChange} />
        </label>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
