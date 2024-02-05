const axios = require("axios");
const express = require("express");
const router = express.Router();

const API_KEY = process.env.MAILCHIMP_API_KEY;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const DATACENTER = API_KEY.split("-")[1];

router.post("/new", async (req, res) => {
  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/`;
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  try {
    const data = {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
    };

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `apikey ${API_KEY}`,
      },
    };

    const response = await axios.post(url, data, options);
    res.status(201).json(response.data);
  } catch (error) {
    if (error.response.status === 400) {
      res.status(400).json({ message: "User already subscribed." });
    } else {
      res
        .status(error.response.status)
        .json({ message: "Error subscribing user: ", error: error.message });
    }
  }
});

module.exports = router;
