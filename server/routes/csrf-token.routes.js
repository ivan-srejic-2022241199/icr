const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ csrfToken: req.csrfToken(), token: req.cookies.token });
});

module.exports = router;
