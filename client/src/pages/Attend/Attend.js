import { useState, useEffect } from "react";
import "./attend.css";
import axios from "../../axiosConfig.js";
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../../util/formatting.js";

import { randomImageArray1 } from "../../assets/images/imageArray.js";
import { randomThumbnailArray1 } from "../../assets/thumbnail-images/thumbnailArray.js";

import PageTitle from "../../components/PageTitle/PageTitle.js";

import { useSnackbar } from "notistack";
import { showSuccessNotification } from "../../util/notifications.js";

import useFadeIn from "../../animation-hooks/fadeIn.js";
import useScaleIn from "../../animation-hooks/scaleIn.js";

import { filterAccessibleEventsNYC } from "../../util/timeZoneFormatting.js";

const Attend = () => {
  const [futureEvents, setFutureEvents] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [image, setImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  // animate images and content
  useFadeIn(true, ".attend-container", 1);
  useFadeIn(true, ".image-container", 1);
  useFadeIn(true, ".attend-info-container", 1);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * randomImageArray1.length);

    setImage(randomImageArray1[randomIndex]);
    setThumbnail(randomThumbnailArray1[randomIndex]);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/events/get-all");
        let events = response.data;
        const futureEvents = filterAccessibleEventsNYC(events);
        setFutureEvents(futureEvents);
      } catch (error) {
        const errorData = error.response ? error.response.data : error.message;
        console.error("There was an error fetching the data:", errorData);
      }
    };
    fetchEvents();
  }, []);

  const handleSelectChange = (e) => {
    const selectElement = e.target;
    const selectedEvent = futureEvents.find(
      (event) => event._id === e.target.value
    );

    if (selectedEvent) {
      setSelectedEventId(selectedEvent._id);
      setDate(selectedEvent.date);
      selectElement.classList.remove("default-option");
      selectElement.classList.add("select-option");
    } else {
      selectElement.classList.add("default-option");
      selectElement.classList.remove("select-option");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEventId) return;

    let convertedDate = convertDateReadability(date);
    const attendeeData = {
      firstName,
      lastName,
      email,
      eventId: selectedEventId,
      date: convertedDate,
      status: "Inquired",
      message,
      subscribe: isChecked,
    };

    const resetForm = () => {
      setFirstName("");
      setLastName("");
      setEmail("");
      setIsChecked(false);
      setSelectedEventId("");
      setDate("");
      setMessage("");
    };

    const postAttendeeData = async () => {
      try {
        const response = await axios.post("/attendees/new", attendeeData);
        if (response.status === 200 || response.status === 201) {
          showSuccessNotification(
            enqueueSnackbar,
            "Thank you for your inquiry"
          );
          if (!isChecked) {
            resetForm();
          }
        }
      } catch (error) {
        const errorData = error.response ? error.response.data : error.message;
        console.error("There was an error sending the data:", errorData);
      }
    };

    const postSubscriptionData = async () => {
      if (isChecked) {
        try {
          const response = await axios.post("/subscribe/new", {
            email,
            firstName,
            lastName,
          });

          if (response.status === 200 || response.status === 201) {
            resetForm();
          }
        } catch (error) {
          if (error.response.status === 400) {
            console.log("User email already subscribed.");
          } else {
            console.error("There was an error subscribing the user: ", error);
          }
          resetForm();
        }
      }
    };

    await postAttendeeData();
    await postSubscriptionData();
  };

  useEffect(() => {
    const selectElement = document.querySelector("select");
    if (selectElement && selectedEventId === "") {
      selectElement.classList.add("default-");
    }
  }, [selectedEventId]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="attend-container">
      <div className="page-left">
        <div className="image-container">
          <img src={image} alt="dobo" />
        </div>
      </div>
      <div className="page-right">
        <PageTitle title={"attend"} thumbnail={thumbnail} />
        <div className="attend-info-container">
          <div className="attend-text">
            Please fill out the form below to attend. We will reach out with
            details. Seating is limited.
          </div>

          <div className="inquiry-form">
            <form onSubmit={handleSubmit}>
              <select
                className="form-element"
                value={selectedEventId}
                onChange={handleSelectChange}
              >
                <option className="default-option" value="" disabled hidden>
                  select a date
                </option>
                {futureEvents.map((event) => (
                  <option
                    className="selected-option"
                    key={event._id}
                    value={event._id}
                  >
                    {convertDateReadability(event.date)}
                    {event.seatsRemaining > 0
                      ? " at " + convertMilitaryTime(event.time)
                      : "SOLD OUT"}
                  </option>
                ))}
              </select>
              <input
                className="form-element"
                type="text"
                value={firstName}
                placeholder="first name:"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                className="form-element"
                type="text"
                value={lastName}
                placeholder="last name:"
                onChange={(e) => setLastName(e.target.value)}
                required
              />

              <input
                className="form-element"
                type="email"
                value={email}
                placeholder="email:"
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <textarea
                className="form-element"
                type="text"
                value={message}
                placeholder="message (optional):"
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="subscribe-container">
                <div className="subscribe-text">
                  Subscribe to receive alerts when new events are posted.
                </div>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </div>

              <button className="button" type="submit">
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attend;
