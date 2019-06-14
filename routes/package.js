const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Package = require("../models/Package");

/* GET home page */
router.get("/package", (req, res, next) => {
  Package.find().then(packages => {
    res.json(packages);
  });
});

router.post("/newpackage", (req, res, next) => {
  let { packageName } = req.body;
  Package.findOne({ packageName, completed: false }).then(pack => {
    if (pack) {
      res.json(pack);
    } else {
      Package.create({ packageName }).then(pack => {
        res.json(pack);
      });
    }
  });
});

router.post("/newentry", (req, res, next) => {
  // res.json(req.body);
  let { packageName, user } = req.body;

  Package.findOneAndUpdate(
    { packageName, completed: false },
    { $push: { entry: user } },
    function(error, success) {
      if (error) {
        res.json(error);
      } else {
        res.json(success);
      }
    }
  );
});

module.exports = router;
