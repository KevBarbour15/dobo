import { useState, useEffect } from "react";
import axios from "../../axiosConfig.js";
import { formatDate } from "../../util/formatting.js";
import "./create-event.css";
import { useSnackbar } from "notistack";
import { showSuccessNotification } from "../../util/notifications.js";

// image imports
import { imageArray } from "../../assets/images/imageArray.js";


import PageTitle from "../../components/PageTitle/PageTitle.js";

import useFadeIn from "../../animation-hooks/fadeIn.js";
import useAnimateForm from "../../animation-hooks/animateForm.js";

const CreateEvent = ({ onEventCreated }) => {
  const [title, setTitle] = useState("");
  const [seats, setSeats] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  useFadeIn(true, ".create-event-container", 0.75, 0.05, 0);
  useFadeIn(true, ".image-container", 1, 0, 0);
  useFadeIn(true, ".create-event-form", 0.5, 0.25, 25);
  useAnimateForm(".form-element-container");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imageArray.length);

    setImage(imageArray[randomIndex]);
  }, []);

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
      <div className="page-left create">
        <div className="image-container">
          <img src={image} alt="dobo" />
        </div>
      </div>
      <div className="page-right">
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
    </div>
  );
};

export default CreateEvent;
