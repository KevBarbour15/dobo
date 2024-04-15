import { useState, useEffect } from "react";
import axios from "../../axiosConfig.jsx";
import { formatDate } from "../../util/formatting.jsx";
import "./create-event.css";

// notification imports

// component imports
import PageTitle from "../PageTitle/PageTitle.jsx";

// animation imports
import useFadeIn from "../../animation-hooks/fadeIn.js";
import useAnimateItems from "../../animation-hooks/animateItems.js";

const CreateEvent = ({ onEventCreated }) => {
  const [title, setTitle] = useState("");
  const [seats, setSeats] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState(0);

  useFadeIn(true, ".create-event-container", 0.75, 0.05, 0);
  useFadeIn(true, ".image-container", 1, 0, 0);
  useFadeIn(true, ".create-event-form", 0.5, 0.25, 25);
  useAnimateItems(".form-element-container");

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
      <PageTitle title={"create event"} />
      <div className="create-event-form">
        <form onSubmit={handleSubmit}>
          <div className="form-element-container">
            <label>event name:</label>
            <input
              className="form-element"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-element-container">
            <label>price:</label>
            <input
              className="form-element"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-element-container">
            <label>date:</label>
            <input
              className="form-element"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-element-container">
            <label>time:</label>
            <input
              className="form-element"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="form-element-container">
            <label>seats:</label>
            <select
              className="form-element"
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
          </div>
          <div className="form-element-container">
            <button className="button" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
