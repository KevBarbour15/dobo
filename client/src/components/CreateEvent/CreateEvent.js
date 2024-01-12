import { useState } from "react";
import axios from "../../axiosConfig.js";
import { formatDate } from "../../util/formatting.js";
import "./create-event.css";
import { useSnackbar } from "notistack";
import { showSuccessNotification } from "../../util/notifications.js";

import img from "../../assets/images/dobo-8.jpg";

const CreateEvent = ({ onEventCreated }) => {
  const [title, setTitle] = useState("");
  const [seats, setSeats] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const notes = "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(date);
    const eventData = {
      title,
      seats,
      seatsRemaining: seats,
      date,
      time,
      price,
      notes,
    };

    try {
      const response = await axios.post("/events/new", eventData);
      if (response.status === 200 || response.status === 201) {
        onEventCreated(response.data);
        setTitle("");
        setSeats(1);
        setDate("");
        setTime("");
        setPrice(0);
        showSuccessNotification(enqueueSnackbar, "Event created!");
      } else {
        console.error("Error creating event:", response);
      }
    } catch (error) {
      const errorData = error.response ? error.response.data : error.message;
      console.error("There was an error sending the data:", errorData);
    }
  };

  return (
    <div className="create-event-container">
      <div className="create-left">
        <div className="image-container">
          <img src={img} alt="dobo" />
        </div>
      </div>
      <div className="create-right">
        <div className="create-event-form">
          <form onSubmit={handleSubmit}>
            <p>Event Name:</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <p>Price:</p>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <p>Date:</p>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <p>Time:</p>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
            <p>Seats:</p>
            <select
              placeholder="Seats"
              value={seats}
              onChange={(e) => setSeats(formatDate(e.target.value))}
              required
            >
              {[...Array(20)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <button type="submit">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
