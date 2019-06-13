const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json({ status: "Home" });
});

router.use("/", authRoutes);

module.exports = router;
