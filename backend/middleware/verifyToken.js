const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      req.user = decoded;
      return next();
    }

    return res
      .status(401)
      .json({ error: "Authorization header missing or invalid" });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" });
    }

    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = verifyToken;
