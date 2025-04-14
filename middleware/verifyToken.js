const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

      req.user = decoded;
      next();
    } else {
      res.status(401).send("Authorization header missing or invalid");
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).send("Invalid token");
    } else {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
};

module.exports = verifyToken;
