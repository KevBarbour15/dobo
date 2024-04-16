import { useState, useEffect, useMemo } from "react";
import "./attend.css";
import axios from "../../axiosConfig.jsx";
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../../util/formatting.jsx";

// image imports
import { randomImageArray1 } from "../../assets/images/imageArray.js";

// component imports
import PageTitle from "../../components/PageTitle/PageTitle.jsx";

// animation imports
import useFadeIn from "../../animation-hooks/fadeIn.js";
import useAnimateItems from "../../animation-hooks/animateItems.js";
import useAnimateImages from "../../animation-hooks/animateImages.js";

// notifications imports
import { useForm, ValidationError } from "@formspree/react";

import { toast } from "react-toastify";
import Toast from "../../components/Toast/Toast.jsx";

import { filterAccessibleEventsNYC } from "../../util/timeZoneFormatting.jsx";

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
  const [state, handleSubmit] = useForm("xdoqpwrb");
  const toastMessage =
    "Thank you for inquiry. We will reach out with details shortly.";

  // animate images and content
  useFadeIn(true, ".attend-container", 0.5, 0.05, 0);
  useFadeIn(true, ".attend-info-container", 0.5, 0.25, 25);
  useAnimateItems(".form-element-container");
  useAnimateImages(true, ".image-container");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * randomImageArray1.length);
    setImage(randomImageArray1[randomIndex]);
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

  const handleFormSubmit = async (e) => {
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
          // success notification
          toast(<Toast message={toastMessage} />, {
            position: "top-left",
            autoClose: 10000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          const formData = {
            "Name:": firstName + " " + lastName,
            "Email:": email,
            "Event date:": convertedDate,
            "Message:": message,
          };

          handleSubmit(formData);

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
        <PageTitle title={"attend"} />
        <div className="attend-info-container">
          <div className="attend-text">
            Please fill out the form below to attend. We will reach out with
            details. Seating is limited.
          </div>

          <div className="inquiry-form">
            <form
              onSubmit={handleFormSubmit}
              acceptCharset="utf-8"
              action="https://formspree.io/f/xdoqpwrb"
              method="post"
            >
              <div className="form-element-container">
                <select
                  className="form-element"
                  value={selectedEventId}
                  onChange={handleSelectChange}
                  required
                >
                  <option className="default-option" value="" disabled hidden>
                    select a date:
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
                        : " - SOLD OUT"}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-element-container">
                <input
                  className="form-element"
                  type="text"
                  //name="First Name"
                  value={firstName}
                  placeholder="first name:"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <ValidationError
                prefix="firstName"
                field="firstName"
                errors={state.errors}
              />
              <div className="form-element-container">
                <input
                  className="form-element"
                  type="text"
                  //name="Last Name"
                  value={lastName}
                  placeholder="last name:"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <ValidationError
                prefix="lastName"
                field="lastName"
                errors={state.errors}
              />
              <div className="form-element-container">
                <input
                  className="form-element"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="email:"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
              <div className="form-element-container">
                <textarea
                  className="form-element"
                  type="text"
                  value={message}
                  name="message"
                  required
                  placeholder="please include number of guests, allergies and any other questions:"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <input type="hidden" name="Date" />
              <div className="form-element-container">
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
              </div>
              <div className="form-element-container">
                <button className="button" type="submit">
                  submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attend;
