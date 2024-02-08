import { useState, useEffect } from "react";
import axios from "../../axiosConfig.js";
import { formatDate } from "../../util/formatting.js";
import "./create-event.css";
import { useSnackbar } from "notistack";
import { showSuccessNotification } from "../../util/notifications.js";

import { imageArray } from "../../assets/images/imageArray.js";
import { thumbnailArray } from "../../assets/thumbnail-images/thumbnailArray.js";

import PageTitle from "../../components/PageTitle/PageTitle.js";

import useFadeIn from "../../animation-hooks/fadeIn.js";
import useScaleIn from "../../animation-hooks/scaleIn.js";

const CreateEvent = ({ onEventCreated }) => {
  const [title, setTitle] = useState("");
  const [seats, setSeats] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useFadeIn(true, ".create-event-container", 1);
  useFadeIn(true,".image-container", 1.5);
  useScaleIn(true, ".create-event-form", 1.5);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imageArray.length);

    setImage(imageArray[randomIndex]);
    setThumbnail(thumbnailArray[randomIndex]);
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
      <div className="page-left">
        <div className="image-container">
          <img src={image} alt="dobo" />
        </div>
      </div>
      <div className="page-right">
        <PageTitle title={"new"} thumbnail={thumbnail} />
        <div className="create-event-form">
          <form onSubmit={handleSubmit}>
            <label>event name:</label>
            <input
              className="form-element"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label>price:</label>
            <input
              className="form-element"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <label>date:</label>
            <input
              className="form-element"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <label>time:</label>
            <input
              className="form-element"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
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

            <button className="button" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
