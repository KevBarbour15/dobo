import { useState, useEffect } from "react";
import "./edit-event.scss";

// axios imports
import axios from "../../../axiosConfig.jsx";

// component imports
import Checkbox from "../../Checkbox/Checkbox.jsx";

// helper function imports
import { formatDate } from "../../../util/formatting.jsx";

// notification imports
import { toast } from "react-toastify";
import Toast from "../../Toast/Toast.jsx";

const EditEvent = ({ event, onClose, onUpdateEvent }) => {
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(formatDate(event.date));
  const [time, setTime] = useState(event.time);
  const [seats, setSeats] = useState(event.seats);
  const [seatsRemaining, setSeatsRemaining] = useState(event.seatsRemaining);
  const [price, setPrice] = useState(event.price);
  const [isPublicEvent, setIsPublicEvent] = useState(event.isPublicEvent);
  const [deleteEvent, setDeleteEvent] = useState(false);
  const committed = event.seats - event.seatsRemaining;

  const successMessage = "Event updated successfully!";
  const errorMessage = "Error updating event. Please try again.";

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);

  useEffect(() => {
    setSeatsRemaining(seats - committed);
  }, [seats, committed, isPublicEvent]);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete("/events/delete-event", {
        data: {
          eventId: event._id,
          attendeeIds: event.attendees,
        },
      });

      if (response.status === 200 || response.status === 201) {
        onUpdateEvent(event._id);
        toast(<Toast message={successMessage} />, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      const errorData = error.response ? error.response.data : error.message;
      console.error("There was an error deleting the event:", errorData);

      toast(<Toast message={errorMessage} />, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (deleteEvent) {
      handleDelete(e);
      onClose();
      return;
    }

    const updatedEventData = {
      ...event,
      title,
      seats,
      seatsRemaining,
      date,
      time,
      price,
      isPublicEvent,
    };

    try {
      const response = await axios.put(
        "/events/update-event",
        updatedEventData
      );

      if (response.status === 200 || response.status === 201) {
        onUpdateEvent(response.data);
        onClose();

        toast(<Toast message={successMessage} />, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error("Error updating event: ", response);
      }
    } catch (error) {
      console.error("Error updating event: ", error);
      toast(<Toast message={errorMessage} />, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handlePublicEventChange = () => {
    setIsPublicEvent(!isPublicEvent);
  };

  const handleDeleteEventChange = () => {
    setDeleteEvent(!deleteEvent);
  };

  return (
    <div className="edit-event-container">
      <form onSubmit={handleSubmit} className="edit-event-form">
        <span className="dash-info-line">
          Name:
          <input
            className="form-element"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </span>
        <span className="dash-info-line">
          Price:
          <input
            className="form-element"
            type="number"
            value={price}
            onChange={handlePriceChange}
          />
        </span>
        <span className="dash-info-line">
          Date:
          <input
            className="form-element"
            type="date"
            value={date}
            onChange={handleDateChange}
          />
        </span>
        <span className="dash-info-line">
          Time:
          <input
            className="form-element"
            type="time"
            value={time}
            onChange={handleTimeChange}
          />
        </span>
        <span className="dash-info-line">
          Seats:
          <select
            className="form-element"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
          >
            {Array.from(
              { length: 25 - committed },
              (_, i) => i + committed
            ).map((i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </span>
        <span className="dash-info-line">
          Seats filled: <span>{committed}</span>
        </span>

        <Checkbox
          text={"Make this event public?"}
          isSelected={isPublicEvent}
          onCheckboxChange={handlePublicEventChange}
        />

        <div className="edit-event-form-delete">
          <Checkbox
            text={"Delete event?"}
            isSelected={deleteEvent}
            onCheckboxChange={handleDeleteEventChange}
          />
        </div>
        <button className="button" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
