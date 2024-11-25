const express = require("express");
const csrf = require("csurf");
const { attachUser } = require("../middleware/user.js");

const authRouter = require("./auth.routes.js");
const adminRouter = require("./admin.routes.js");
const publicRouter = require("./public.routes.js");
const csrfRouter = require("./csrf-token.routes.js");
const { requireAdmin } = require("../util.js");

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

router.use("/", authRouter);
router.use("/public", publicRouter);
router.use(attachUser);
// router.use(csrfProtection);
// router.use("/csrf-token", csrfRouter); //Uncomment this when you use are done testing in Postman
router.use("/admin", requireAdmin, adminRouter);

module.exports = router;
