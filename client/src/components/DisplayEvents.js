import React from "react";
import { convertMilitaryTime, convertDateReadability } from "../helpers";

const EventDetails = ({ event }) => (
  <div>
    <div className="event-details">
      <h2 className="event-title">{event.title}</h2>
      <p>Seats: {event.seats}</p>
      <p>Seats Available: {event.seatsRemaining}</p>
      <p>Date: {convertDateReadability(event.date)}</p>
      <p>Time: {convertMilitaryTime(event.time)}</p>
      <p>Price: ${event.price}</p>
    </div>
    <div>
      <button type="submit">Edit</button>
      <button type="submit">Delete</button>
    </div>
  </div>
);

// TODO: Add a button to delete an event
// TODO: Add a button to edit an event ** maybe a modal?

const DisplayEvents = ({ events }) => (
  <div className="event-form">
    <h1>Upcoming Events</h1>
    {events.map((event) => (
      <EventDetails key={event._id} event={event} />
    ))}
  </div>
);

export default DisplayEvents;
