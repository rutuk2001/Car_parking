const jwt = require("jsonwebtoken");

const jWtAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ Message: "Unauthorized" });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log("decoded", decodedToken);
    next();
  } catch (err) {
    return res.status(401).json({ Message: "Unauthorized" });
  }
};

module.exports = { jWtAuth };
