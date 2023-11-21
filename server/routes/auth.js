const express = require("express");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware");
const router = express.Router();
const SECRET_KEY = process.env.DOBO_SECRET_KEY;
const USERNAME = process.env.DOBO_USERNAME;
const PASSWORD = process.env.DOBO_PASSWORD;


router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Attemping to login... (server side)");
  if (username === USERNAME && password === PASSWORD) {
    const token = jwt.sign({ username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

router.get("/validate-token", verifyToken, (req, res) => {
  res.status(200).send({ valid: true });
});


module.exports = router;
