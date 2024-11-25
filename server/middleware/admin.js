const { requireAuth } = require("./user");
const { StatusCodes } = require("http-status-codes");

const requireAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "ADMIN") {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Insufficient role" });
  }
  next();
};

module.exports = [requireAdmin, requireAuth];
