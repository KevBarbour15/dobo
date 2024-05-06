function getCurrentDateInNYC() {
  const now = new Date();
  const nycDate = now.toLocaleString("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const [month, day, year] = nycDate.split("/");
  return `${year}-${month}-${day}`;
}

function getCurrentTimeInNYC() {
  const now = new Date();
  const nycTime = now.toLocaleString("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const [hour, minute] = nycTime.split(":");
  return `${hour}:${minute}`;
}

export const filterAccessibleEventsNYC = (events, filterPubicEvents) => {
  const dateInNYC = getCurrentDateInNYC();
  const timeInNYC = getCurrentTimeInNYC();

  return events.filter((event) => {
    const eventDate = event.date.split("T")[0];
    const eventTime = event.time;
    const isPublicEvent = event.isPublicEvent;

    if (filterPubicEvents) {
      // return only public events that are in the future
      return (
        (eventDate > dateInNYC && isPublicEvent) ||
        (eventDate === dateInNYC && eventTime >= timeInNYC && isPublicEvent)
      );
    } else {
      // return all events that are in the future
      return (
        eventDate > dateInNYC ||
        (eventDate === dateInNYC && eventTime >= timeInNYC)
      );
    }
  });
};

export const filterPastEventsNYC = (events) => {
  const dateInNYC = getCurrentDateInNYC();
  const timeInNYC = getCurrentTimeInNYC();

  return events.filter((event) => {
    const eventDate = event.date.split("T")[0];
    const eventTime = event.time;

    return (
      eventDate < dateInNYC ||
      (eventDate === dateInNYC && eventTime < timeInNYC)
    );
  });
};
