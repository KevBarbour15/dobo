import { useState } from "react";
import "./edit-event.css";
import axios from "../../../axiosConfig.js";
import { formatDate } from "../../../util/formatting.js";
import { useSnackbar } from "notistack";
import { showSuccessNotification } from "../../../util/notifications.js";

const EditEvent = ({ event, onClose, onUpdateEvent }) => {
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(formatDate(event.date));
  const [time, setTime] = useState(event.time);
  const [seats, setSeats] = useState(event.seats);
  const [seatsRemaining, setSeatsRemaining] = useState(event.seatsRemaining);
  const [price, setPrice] = useState(event.price);
  const committed = event.seats - event.seatsRemaining;

  const { enqueueSnackbar } = useSnackbar();

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
        showSuccessNotification(enqueueSnackbar, "Event updated!");
      } else {
        console.error("Error updating event: ", response);
      }
    } catch (error) {
      console.error("Error updating event: ", error);
    }
  };

  return (
    <div className="edit-event-container">
      <div className="edit-event-form">
        <form onSubmit={handleSubmit}>
          <div className="event-label">
            <label>title:</label>
            <input
              className="form-element"
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="event-label">
            <label>price:</label>
            <select
              className="form-element"
              type="number"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
          <div className="event-label">
            <label>date:</label>
            <input
              className="form-element"
              type="date"
              value={date}
              onChange={handleDateChange}
            />
          </div>
          <div className="event-label">
            <label>time:</label>
            <input
              className="form-element"
              type="time"
              value={time}
              onChange={handleTimeChange}
            />
          </div>
          <div className="seating-container">
            <div className="seating-labels">
              <label> attendees: {committed}</label>
              <label> seats: {seats}</label>
            </div>
            <div className="count-button-container">
              <span
                class="material-symbols-outlined"
                type="button"
                onClick={decrementSeats}
                disabled={seats <= committed}
              >
                remove
              </span>

              <input type="number" value={seats} readOnly />

              <span
                class="material-symbols-outlined"
                classtype="button"
                onClick={incrementSeats}
              >
                add
              </span>
            </div>
          </div>

          <button className="button" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
