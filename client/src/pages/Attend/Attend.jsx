import { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
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
  winePairings: 0,
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
    case "update_winePairings":
      return { ...state, winePairings: parseInt(action.payload) };
    default:
      return state;
  }
}

const Attend = () => {
  const [futureEvents, setFutureEvents] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [seatsRemaining, setSeatsRemaining] = useState(1);

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

  // custom fade and parallax hooks
  useFadeIn(".page-container", 1, 0, attendImage);
  usePageScroll();

  useGSAP(() => {
    gsap.set(".attend-image img", {
      yPercent: -60,
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
        end: "bottom 55%",
        scrub: 1,
      },
    });
  }, []);

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
                    Limited seating available. $160 per seat. An additional wine
                    pairing can be added to a seat for $40.
                  </p>
                  <p>
                    For additional information, please refer to our{" "}
                    <Link className="faq-link" aria-label="FAQ page" to="/faq">
                      FAQ page
                    </Link>
                    .
                  </p>
                </div>

                <div
                  className="inquiry-form"
                  role="form"
                  aria-label="Event Registration Form"
                >
                  <select
                    className="form-element"
                    value={state.selectedEventId}
                    onChange={handleSelectChange}
                    required
                    aria-label="Select event date"
                    aria-required="true"
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
                  {state.selectedEventId && seatsRemaining > 0 ? (
                    <input
                      className="form-element"
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={state.firstName}
                      placeholder="First name:"
                      aria-label="First name"
                      aria-required="true"
                      onChange={(e) =>
                        dispatch({
                          type: "update_firstName",
                          payload: e.target.value,
                        })
                      }
                      required
                      disabled={seatsRemaining === 0}
                    />
                  ) : (
                    <div className="form-element-disabled">First name</div>
                  )}

                  {state.selectedEventId && seatsRemaining > 0 ? (
                    <input
                      className="form-element"
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={state.lastName}
                      placeholder="Last name:"
                      aria-label="Last name"
                      aria-required="true"
                      onChange={(e) =>
                        dispatch({
                          type: "update_lastName",
                          payload: e.target.value,
                        })
                      }
                      required
                      disabled={seatsRemaining === 0}
                    />
                  ) : (
                    <div className="form-element-disabled">Last name</div>
                  )}

                  {state.selectedEventId && seatsRemaining > 0 ? (
                    <input
                      className="form-element"
                      type="email"
                      name="email"
                      id="email"
                      value={state.email}
                      placeholder="Email:"
                      aria-label="Email address"
                      aria-required="true"
                      onChange={(e) => {
                        dispatch({
                          type: "update_email",
                          payload: e.target.value,
                        });
                      }}
                      required
                      disabled={seatsRemaining === 0}
                    />
                  ) : (
                    <div className="form-element-disabled">Email</div>
                  )}

                  {state.selectedEventId && seatsRemaining > 0 ? (
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
                      aria-label="Number of guests"
                      aria-required="true"
                    >
                      {Array.from(
                        { length: seatsRemaining },
                        (_, i) => i + 1
                      ).map((seat) => (
                        <option key={seat} value={seat}>
                          {seat} guest{seat > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="form-element-disabled">
                      {seatsRemaining === 0
                        ? "Sold out"
                        : "Select a date to select the number of guests."}
                    </div>
                  )}
                  {state.selectedEventId && seatsRemaining > 0 ? (
                    <select
                      className="form-element"
                      value={state.winePairings}
                      disabled={!state.selectedEventId && state.seats >= 1}
                      onChange={(e) =>
                        dispatch({
                          type: "update_winePairings",
                          payload: e.target.value,
                        })
                      }
                      aria-label="Wine pairing options"
                    >
                      <option value={0}>No wine pairing</option>
                      {Array.from({ length: state.seats }, (_, i) => i + 1).map(
                        (seat) => (
                          <option key={seat} value={seat}>
                            {seat} wine pairing{seat > 1 ? "s" : ""}
                          </option>
                        )
                      )}
                    </select>
                  ) : (
                    <div className="form-element-disabled">
                      {seatsRemaining === 0
                        ? "Sold out"
                        : "Select number of guests to select wine pairings."}
                    </div>
                  )}

                  {state.selectedEventId && seatsRemaining > 0 ? (
                    <textarea
                      className="form-element"
                      name="message"
                      id="message"
                      value={state.message}
                      placeholder="Message (optional):"
                      aria-label="Additional message"
                      onChange={(e) =>
                        dispatch({
                          type: "update_message",
                          payload: e.target.value,
                        })
                      }
                      disabled={seatsRemaining === 0}
                    />
                  ) : (
                    <div className="text-area-disabled">Message (optional)</div>
                  )}

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
                        {seatsRemaining === 0 ? "Sold out" : "Checkout"}
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
