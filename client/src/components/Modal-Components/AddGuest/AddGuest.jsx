import "./add-guest.scss";
import { useState } from "react";

// axios imports
import axios from "../../../axiosConfig.jsx";

// notification imports
import { toast } from "react-toastify";
import Toast from "../../Toast/Toast.jsx";

const AddGuest = ({ event, onClose, onUpdateEvent }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [seats, setSeats] = useState(1);
  const [winePairings, setWinePairings] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const toastMessage = "Guest added successfully!";
  const errorMessage = "Error adding guest. Please try again.";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newGuest = {
      firstName,
      lastName,
      email,
      seats,
      winePairings,
      status: "Confirmed",
      totalPayment,
      eventId: event._id,
    };

    try {
      const response = await axios.post("/attendees/add", newGuest);
      if (response.status === 200 || response.status === 201) {
        onUpdateEvent(response.data);
        onClose();

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

  return (
    <div className="add-guest-container">
      <form className="add-guest-form" onSubmit={handleSubmit}>
        <span className="dash-info-line">
          First name:
          <input
            className="form-element"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </span>
        <span className="dash-info-line">
          Last name:
          <input
            className="form-element"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </span>

        <span className="dash-info-line">
          Payment: $
          <input
            className="form-element"
            type="number"
            value={totalPayment}
            onChange={(e) => setTotalPayment(e.target.value)}
          />
        </span>

        <span className="dash-info-line">
          Email:
          <input
            className="form-element"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </span>
        <span className="dash-info-line">
          Seats:
          <select
            className="form-element"
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
          >
            {[...Array(event.seatsRemaining)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </span>
        <span className="dash-info-line">
          Wine pairings:
          <select
            className="form-element"
            value={winePairings}
            onChange={(e) => setWinePairings(e.target.value)}
          >
            <option value={Number(0)}>0</option>
            {[...Array(Number(seats))].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </span>
        {firstName && lastName && email && seats ? (
          <button className="button" type="submit">
            Add Guest
          </button>
        ) : (
          <div className="checkout-button-disabled">Add guest</div>
        )}
      </form>
    </div>
  );
};

export default AddGuest;
