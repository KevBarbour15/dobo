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
        <input
          className="form-element"
          type="text"
          value={firstName}
          placeholder="First name:"
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input
          className="form-element"
          type="text"
          value={lastName}
          placeholder="Last name:"
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <input
          className="form-element"
          type="email"
          name="email"
          value={email}
          placeholder="Email:"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <select
          className="form-element"
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
        >
          {[...Array(event.seatsRemaining)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1} {i + 1 === 1 ? "seat" : "seats"}
            </option>
          ))}
        </select>

        <select
          className="form-element"
          value={winePairings}
          onChange={(e) => setWinePairings(e.target.value)}
        >
          <option value={Number(0)}>0 wine pairings</option>
          {[...Array(Number(seats))].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1} {i + 1 === 1 ? "wine pairing" : "wine pairings"}
            </option>
          ))}
        </select>
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
