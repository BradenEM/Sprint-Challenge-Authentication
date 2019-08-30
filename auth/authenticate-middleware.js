const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (tokenHeader) {
    jwt.verify(tokenHeader, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          message: "token verification failed and YOU SHALL NOT PASS",
          error: err
        });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ message: "missing authorization header and YOU SHALL NOT PASS" });
  }
};
