require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const eventsRoutes = require("./routes/events");

app.use("/auth", authRoutes);
app.use("/events", eventsRoutes);

connect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});