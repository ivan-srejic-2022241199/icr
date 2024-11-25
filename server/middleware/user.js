const { expressjwt: jwt } = require("express-jwt");
const jwtDecode = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const attachUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication invalid" });
  }
  const decodedToken = jwtDecode.decode(token);

  if (!decodedToken) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "There was a problem authorizing the request",
    });
  } else {
    req.user = decodedToken;
    next();
  }
};

const requireAuth = jwt({
  secret: process.env.JWT_SECRET || "ivan",
  audience: "dp",
  issuer: "dp",
  algorithms: ["HS256"],
  getToken: (req) => req.cookies.token,
});

module.exports = { attachUser, requireAuth };
