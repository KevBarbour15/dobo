const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.DOBO_SECRET_KEY;

function verifyToken(req, res, next) {
  console.log("Verifying token...");
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    jwt.verify(bearerToken, SECRET_KEY, (err, data) => {
      if (err) {
        res.sendStatus(403);
        console.log("If,,,")
        console.log("Error verifying token: ", err);
      } else {
        req.userData = data;
        console.log("User data: ", data);
        next();
      }
    });
  } else {
    res.sendStatus(403);
    console.log("Error verifying token: ", err);
  }
}

module.exports = verifyToken;
