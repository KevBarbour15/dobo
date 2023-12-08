// CreateEvent.js
import { useState } from "react";
import axios from "../axiosConfig";
import { formatDate } from "../util/formatting";

const CreateEvent = ({ onEventCreated }) => {
  const [title, setTitle] = useState("");
  const [seats, setSeats] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState(0);

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
      } else {
        console.error("Error creating event:", response);
      }
    } catch (error) {
      const errorData = error.response ? error.response.data : error.message;
      console.error("There was an error sending the data:", errorData);
    }
  };

  return (
    <div className="event-form">
      <h1>Create New Event</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Number of Seats:
          <select
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
        </label>

        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <label>
          Time:
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        {/*
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
            */}
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
