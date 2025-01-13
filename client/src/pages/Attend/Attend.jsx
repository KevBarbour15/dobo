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

// notifications imports
import { useForm, ValidationError } from "@formspree/react";

import { MoveDown } from "lucide-react";

import { toast } from "react-toastify";
import Toast from "../../components/Toast/Toast.jsx";

import { filterAccessibleEventsNYC } from "../../util/timeZoneFormatting.jsx";

let initialState = {
  firstName: "",
  lastName: "",
  email: "",
  selectedEventId: "",
  date: "",
  message: "",
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
    case "update_date":
      return { ...state, date: action.payload };
    case "update_message":
      return { ...state, message: action.payload };
    default:
      return state;
  }
}

const Attend = () => {
  const [futureEvents, setFutureEvents] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const [submit, handleSubmit] = useForm("xdoqpwrb");
  const toastMessage =
    "Thank you for inquiry. We will reach out with details shortly.";

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

    if (selectedEvent) {
      dispatch({
        type: "update_selectedEventId",
        payload: selectedEvent._id,
      });
      dispatch({
        type: "update_date",
        payload: selectedEvent.date,
      });
      selectElement.classList.remove("default-option");
      selectElement.classList.add("select-option");
    } else {
      selectElement.classList.add("default-option");
      selectElement.classList.remove("select-option");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!state.selectedEventId) return;

    let convertedDate = convertDateReadability(state.date);

    const attendeeData = {
      eventId: state.selectedEventId,
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      message: state.message,
    };

    const resetForm = () => {
      dispatch({ type: "update_firstName", payload: "" });
      dispatch({ type: "update_lastName", payload: "" });
      dispatch({ type: "update_email", payload: "" });
      dispatch({ type: "update_selectedEventId", payload: "" });
      dispatch({ type: "update_date", payload: "" });
      dispatch({ type: "update_message", payload: "" });
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
            "Name:": state.firstName + " " + state.lastName,
            "Email:": state.email,
            "Event date:": convertedDate,
            "Message:": state.message,
          };

          handleSubmit(formData);

          resetForm();
        }
      } catch (error) {
        const errorData = error.response ? error.response.data : error.message;
        console.error("There was an error sending the data:", errorData);
      }
    };
    /*
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
    };*/

    await postAttendeeData();
  };

  useEffect(() => {
    const selectElement = document.querySelector("select");
    if (selectElement && state.selectedEventId === "") {
      selectElement.classList.add("default-");
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

                <form
                  className="inquiry-form"
                  onSubmit={handleFormSubmit}
                  acceptCharset="utf-8"
                  action="https://formspree.io/f/xdoqpwrb"
                  method="post"
                >
                  <div className="form-element-container">
                    <select
                      className="form-element"
                      value={state.selectedEventId}
                      onChange={handleSelectChange}
                      required
                    >
                      <option
                        className="default-option"
                        value=""
                        disabled
                        hidden
                      >
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
                      value={state.email}
                      placeholder="Email:"
                      onChange={(e) =>
                        dispatch({
                          type: "update_email",
                          payload: e.target.value,
                        })
                      }
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
                      value={state.message}
                      name="message"
                      placeholder="Optional message:"
                      onChange={(e) =>
                        dispatch({
                          type: "update_message",
                          payload: e.target.value,
                        })
                      }
                    />
                  </div>
                  {state.selectedEventId &&
                  state.firstName &&
                  state.lastName &&
                  state.email ? (
                    <div className="form-element-container">
                      <CheckoutButton
                        eventId={state.selectedEventId}
                        attendee={state}
                      />
                    </div>
                  ) : (
                    <div className="form-element-container">
                      <div className="checkout-button-disabled"></div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attend;
