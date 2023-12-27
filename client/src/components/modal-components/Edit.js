import { useState } from "react";
import { convertDateReadability, formatDate } from "../../util/formatting.js";
import axios from "../../axiosConfig";
import "../../styles/edit-event.css";

const EditEvent = ({ event, onClose, onUpdateEvent }) => {
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(formatDate(event.date));
  const [time, setTime] = useState(event.time);
  const [seats, setSeats] = useState(event.seats);
  const [seatsRemaining, setSeatsRemaining] = useState(event.seatsRemaining);
  const [price, setPrice] = useState(event.price);
  const committed = event.seats - event.seatsRemaining;

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);

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
      price,
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
    <div className="edit-event-container">
      <div className="edit-event-date">
        <h1>{convertDateReadability(event.date)}</h1>
      </div>
      <div className="edit-event-form">
        <form onSubmit={handleSubmit}>
          <p>Title:</p>
          <input type="text" value={title} onChange={handleTitleChange} />

          <div>
            <p>Seats:</p>
            <div className="count-button-container">
              <div className="count-button">
                <span
                  type="button"
                  onClick={decrementSeats}
                  disabled={seats <= committed}
                  className="count-button"
                >
                  -
                </span>
              </div>
              <input type="number" value={seats} readOnly />
              <div className="count-button">
                <span type="button" onClick={incrementSeats}>
                  +
                </span>
              </div>
            </div>
            <p> People Commited: {committed}</p>
          </div>
          <p>Date and Time:</p>
          <input type="date" value={date} onChange={handleDateChange} />
          <input type="time" value={time} onChange={handleTimeChange} />
          <p>Price:</p>
          <input
            type="number"
            value={price}
            onChange={handlePriceChange}
          />
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
