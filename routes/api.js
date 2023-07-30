const express = require("express");
const router = express.Router();
const cors = require("cors");

/* GET home page. */
router.get("/", cors(), function (req, res, next) {
  res.json({ text: "lol" });
});

module.exports = router;
