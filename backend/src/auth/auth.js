const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    if (!req.cookies || !req.cookies.userAuth)
      return res.status(403).json("Unauthorized");


    const user = jwt.verify(req.cookies.userAuth, process.env.JWT_SECRET);

    if (!user || !user.userId) return res.status(403).json("Unauthorized");

    req.userId = user.userId;

    next();
  } catch (error) {
    res.json({
      message:"Some error occurred",
      error:error
    })
  }
};

module.exports = authMiddleware;
