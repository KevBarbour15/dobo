import { useState, useEffect, useReducer } from "react";
import "./attend.scss";

// axios imports
import axios from "../../axiosConfig.jsx";

// image imports
import attendImage from "../../assets/images/attend.jpg";
import attendVert from "../../assets/images/attend-vert.jpg";

// helper function imports
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../../util/formatting.jsx";

// component imports
import CheckoutButton from "../../components/CheckoutButton/CheckoutButton.jsx";
import PageTitle from "../../components/PageTitle/PageTitle.jsx";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePageScroll from "../../animation-hooks/pageScroll.js";
import useFadeIn from "../../animation-hooks/fadeIn.js";

import { MoveDown } from "lucide-react";

import { filterAccessibleEventsNYC } from "../../util/timeZoneFormatting.jsx";

let initialState = {
  firstName: "",
  lastName: "",
  email: "",
  selectedEventId: "",
  message: "",
  seats: 1,
  date: "",
  time: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "update_firstName":
      return { ...state, firstName: action.payload };
    case "update_lastName":
      return { ...state, lastName: action.payload };
    case "update_email":
      return { ...state, email: action.payload };
    case "update_selectedEventId":
      return { ...state, selectedEventId: action.payload };
    case "update_message":
      return { ...state, message: action.payload };
    case "update_date":
      return { ...state, date: action.payload };
    case "update_time":
      return { ...state, time: action.payload };
    case "update_seats":
      return { ...state, seats: parseInt(action.payload) };
    default:
      return state;
  }
}

const Attend = () => {
  const [futureEvents, setFutureEvents] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [seatsRemaining, setSeatsRemaining] = useState(1);

  // custom fade and parallax hooks
  useFadeIn(true, ".page-container", 1, 0);
  usePageScroll();

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

    setSeatsRemaining(selectedEvent.seatsRemaining);

    if (selectedEvent) {
      // format date and time for readability in stripe display
      const date = convertDateReadability(selectedEvent.date);
      const time = convertMilitaryTime(selectedEvent.time);

      dispatch({
        type: "update_selectedEventId",
        payload: selectedEvent._id,
      });
      dispatch({
        type: "update_date",
        payload: date,
      });
      dispatch({
        type: "update_time",
        payload: time,
      });

      selectElement.classList.remove("default-option");
      selectElement.classList.add("selected-option");
    } else {
      selectElement.classList.add("default-option");
      selectElement.classList.remove("selected-option");
    }
  };

  useEffect(() => {
    const selectElement = document.querySelector("select");
    if (selectElement && state.selectedEventId === "") {
      selectElement.classList.add("default-option");
    }
  }, [state.selectedEventId]);

  useGSAP(() => {
    gsap.set(".attend-image img", {
      yPercent: -65,
    });

    gsap.to(".attend-image img", {
      yPercent: 0,
      scrollTrigger: {
        trigger: ".attend-image img",
        start: "top bottom",
        end: "bottom center",
        scrub: 1,
      },
    });

    gsap.to(".scroll-down-container", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".scroll-down-container",
        start: "bottom bottom",
        end: "bottom center",
        scrub: 1,
      },
    });
  }, []);

  // Add email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <div className="page-container">
        <div className="splash-image-container">
          <div
            className="splash-image"
            style={{ backgroundImage: `url(${attendImage})` }}
          >
            &nbsp;
          </div>

          <div className="scroll-down-container">
            <MoveDown strokeWidth={1.25} size={40} />
          </div>
        </div>

        <PageTitle title={"Attend"} />

        <div className="container">
          <div className="page-content">
            <div className="attend-container">
              <div className="attend-image-container">
                <div className="attend-image">
                  <img src={attendVert} alt="Attend" />
                </div>
              </div>
              <div className="attend-info-container">
                <div className="attend-text">
                  <p>
                    Please fill out the form and complete the purchase to secure
                    your place at a Dobo event. We will follow up with more
                    information.{" "}
                  </p>
                  <p className="attend-text-italic">
                    Limited seating available. $160 per seat.
                  </p>
                </div>

                <div className="inquiry-form">
                  <select
                    className="form-element"
                    value={state.selectedEventId}
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

                  <input
                    aria-label="First Name"
                    className="form-element"
                    type="text"
                    name="First Name"
                    value={state.firstName}
                    placeholder="First name:"
                    onChange={(e) =>
                      dispatch({
                        type: "update_firstName",
                        payload: e.target.value,
                      })
                    }
                    required
                  />

                  <input
                    className="form-element"
                    type="text"
                    name="Last Name"
                    value={state.lastName}
                    placeholder="Last name:"
                    onChange={(e) =>
                      dispatch({
                        type: "update_lastName",
                        payload: e.target.value,
                      })
                    }
                    required
                  />

                  <input
                    className="form-element"
                    type="email"
                    Name="email"
                    required
                    value={state.email}
                    placeholder="Email:"
                    onChange={(e) => {
                      dispatch({
                        type: "update_email",
                        payload: e.target.value,
                      });
                    }}
                    onBlur={(e) => {
                      if (
                        !isValidEmail(e.target.value) &&
                        e.target.value !== ""
                      ) {
                        e.target.setCustomValidity(
                          "Please enter a valid email address"
                        );
                      } else {
                        e.target.setCustomValidity("");
                      }
                    }}
                  />

                  <select
                    className="form-element"
                    value={state.seats}
                    disabled={!state.selectedEventId}
                    onChange={(e) =>
                      dispatch({
                        type: "update_seats",
                        payload: e.target.value,
                      })
                    }
                  >
                    {Array.from(
                      { length: seatsRemaining },
                      (_, i) => i + 1
                    ).map((seat) => (
                      <option key={seat} value={seat}>
                        {seat} ticket{seat > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>

                  <textarea
                    className="form-element"
                    type="text"
                    value={state.message}
                    name="message"
                    placeholder="Message (optional):"
                    onChange={(e) =>
                      dispatch({
                        type: "update_message",
                        payload: e.target.value,
                      })
                    }
                  />

                  {state.selectedEventId &&
                  state.firstName &&
                  state.lastName &&
                  isValidEmail(state.email) ? (
                    <div className="form-element-container">
                      <CheckoutButton attendee={state} />
                    </div>
                  ) : (
                    <div className="form-element-container">
                      <div className="checkout-button-disabled">
                        Purchase seat
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attend;
