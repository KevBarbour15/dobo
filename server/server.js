require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is up and running.");
});

const authRoutes = require("./routes/auth");
const eventsRoutes = require("./routes/events");
const attendeesRoutes = require("./routes/attendees");
const subscribeRoutes = require("./routes/subscribe");

app.use("/auth", authRoutes);
app.use("/events", eventsRoutes);
app.use("/attendees", attendeesRoutes);
app.use("/subscribe", subscribeRoutes);

connect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
