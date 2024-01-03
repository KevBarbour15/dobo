export const convertMilitaryTime = (militaryTime) => {
  if (!/^([01]\d|2[0-3]):?([0-5]\d)$/.test(militaryTime)) {
    return "Invalid time format!";
  }

  const parts = militaryTime.split(":");
  let hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);

  let period = "AM";
  if (hours >= 12) {
    period = "PM";
  }
  if (hours > 12) {
    hours -= 12;
  }
  if (hours === 0) {
    hours = 12;
  }

  return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export const formatDate = (date) => {
  return date ? date.split("T")[0] : new Date().toISOString().split("T")[0];
};

export const convertDateReadability = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
