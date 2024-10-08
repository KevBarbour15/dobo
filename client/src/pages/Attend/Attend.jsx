import { useState, useEffect } from "react";
import "./attend.scss";

// axios imports
import axios from "../../axiosConfig.jsx";

// helper function imports
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../../util/formatting.jsx";

// component imports
import Checkbox from "../../components/Checkbox/Checkbox.jsx";
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import PageTransition from "../../components/PageTransition/PageTransition.jsx";

// animation imports
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import useParallax from "../../animation-hooks/parallax.js";
import useFadeIn from "../../animation-hooks/fadeIn.js";

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
  const [state, handleSubmit] = useForm("xdoqpwrb");
  const toastMessage =
    "Thank you for inquiry. We will reach out with details shortly.";

  // custom fade and parallax hooks
  useFadeIn(true, ".page-container", 1, 0);
  useParallax();

  useGSAP(() => {
    // attend form and text animation
    const p = new SplitText(".attend-text", {
      type: "lines",
    });

    const p2 = new SplitText(".subscribe-text", {
      type: "words",
    });

    let formTl = gsap.timeline({ ease: "sine.out" });

    formTl
      .from(
        p.lines,
        {
          x: (i) => (i % 2 === 0 ? 50 : -50),
          opacity: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".attend-text",
            start: "top 70%",
            end: "top 50%",
            scrub: 2,
          },
        },
        0
      )
      .from(
        ".form-element-container",
        {
          opacity: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".form-element-container",
            start: "top 70%",
            end: "top 50%",
            scrub: 2,
          },
          x: (i) => (i % 2 === 0 ? 50 : -50),
        },
        0
      )
      .from(
        p2.words,
        {
          y: 75,
          opacity: 0,
          stagger: 0.1,
        },
        0
      );
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/events/get-all");
        let events = response.data;

        // filter events to only show future events that are set to public
        const filterPublicEvents = true;
        const futureEvents = filterAccessibleEventsNYC(
          events,
          filterPublicEvents
        );

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
            autoClose: 2000,
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
    <>
      <PageTransition />
      <div className="page-container">
        <div className="parallax">
          <div className="attend-layer image-layer"></div>
          <div className="page-title">ATTEND</div>
        </div>

        <div className="page-bottom">
          <PageTitle title={"attend"} />
          <div className="attend-info-container">
            <div className="attend-text">
              Please fill out the form to secure your place at a Dobo event.
              We’ll follow up with more information.{" "}
              <span className="attend-text-italic">
                Limited seating available.
              </span>
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
                      Select a date:
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
                    placeholder="First name:"
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
                    placeholder="Last name:"
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
                    placeholder="Email:"
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
                    placeholder="Please include number of guests, allergies and any other questions:"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <input type="hidden" name="Date" />
                <div className="form-element-container">
                  {
                    <Checkbox
                      text={
                        "Subscribe to receive alerts when new events are posted."
                      }
                      isSelected={isChecked}
                      onCheckboxChange={handleCheckboxChange}
                    />
                  }
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
    </>
  );
};

export default Attend;
