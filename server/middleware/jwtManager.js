const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authToken = req.headers["authorization"].split(" ")[1];

  if (!authToken) {
    return res.status(401).json("Your token is missing, Please Login again");
  }

  jwt.verify(authToken, "token", (err, data) => {
    if (err) {
      return res.status(401).json("Invalid token, Please Login again");
    }
    req.user = data;
    next();
  });
};

module.exports = authenticate;
