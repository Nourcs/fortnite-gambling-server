const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const packageRoutes = require("./package");

/* GET home page */

router.use("/", authRoutes);
router.use("/", packageRoutes);

router.get("/", (req, res, next) => {
  res.json({ status: "Home" });
});

module.exports = router;
