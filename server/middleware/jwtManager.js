const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authToken = req.cookies.dashboard;
  if (!authToken) {
    return res.status(401).json({message:"Your token is missing, Please Login again"});
  }

  jwt.verify(authToken, "token", (err, data) => {
    if (err) {
      return res.status(401).json({message:"Invalid token, Please Login again"});
    }
    req.user = data;
    next();
  });
};

module.exports = authenticate;
