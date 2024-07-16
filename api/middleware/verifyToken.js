const jwt = require("jsonwebtoken");
// var LocalStorage = require("node-localstorage").LocalStorage;
// localStorage = new LocalStorage("./scratch");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json("You are not authenticated!");
  }

  jwt.verify(token, process.env.SECRET, async (err, data) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    req.userId = data.id;
    next();
  });
};

module.exports = verifyToken;
