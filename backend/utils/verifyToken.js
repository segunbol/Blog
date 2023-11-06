const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
  if (!token) {
    console.log("You are not authenticated!");
    return res.status(401).json("You are not authenticated!");
  }
  jwt.verify(token, process.env.SECRET, async (err, data) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    req.userId = data._id;

    // console.log("passed")

    next();
  });
};

module.exports = verifyToken;
