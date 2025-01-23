import { useState } from "react";
import axios from "../../axiosConfig.jsx";
import { formatDate } from "../../util/formatting.jsx";
import "./create-event.scss";

// notification imports
import { toast } from "react-toastify";
import Toast from "../Toast/Toast.jsx";

import Checkbox from "../Checkbox/Checkbox.jsx";

const toastMessage = "Event created successfully!";

const CreateEvent = ({ onEventCreated }) => {
  const [title, setTitle] = useState("");
  const [seats, setSeats] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState(0);
  const [isPublicEvent, setIsPublicEvent] = useState(false);

  //initialize empty notes
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
      isPublicEvent,
      totalPayment: 0,
      winePairings: 0,
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
        setIsPublicEvent(false);

        toast(<Toast message={toastMessage} />, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error("Error creating event:", response);
      }
    } catch (error) {
      const errorData = error.response ? error.response.data : error.message;
      console.error("There was an error sending the data:", errorData);
    }
  };

  const handlePublicEventChange = () => {
    setIsPublicEvent(!isPublicEvent);
  };

  return (
    <div className="create-event-container">
      <div className="container">
        <form className="create-event-form" onSubmit={handleSubmit}>
          <span className="dash-info-line">
            Event Name:
            <input
              className="form-element"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </span>
          <span className="dash-info-line">
            Price:
            <input
              className="form-element"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </span>
          <span className="dash-info-line">
            Date:
            <input
              className="form-element"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </span>
          <span className="dash-info-line">
            Time:
            <input
              className="form-element"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </span>
          <span className="dash-info-line">
            Seats:
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
          </span>
          <div className="form-element-container">
            {
              <Checkbox
                text={"Make this a public event?"}
                isSelected={isPublicEvent}
                onCheckboxChange={handlePublicEventChange}
              />
            }
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
