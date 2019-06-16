const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Package = require("../models/Package");
const Winner = require("../models/Winner");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/* GET home page */
router.get("/package", (req, res, next) => {
  Package.find()
    .populate("entry")
    .then(packages => {
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
        Package.findOne({ packageName, completed: false }).then(pack => {
          // console.log(Math.floor(Math.random() * Math.floor(10)));
          res.json(pack);
        });
      }
    }
  );
});

router.post("/handlepackage", (req, res, next) => {
  let { packageName, user } = req.body;

  Package.findOneAndUpdate(
    { packageName, completed: false },
    { completed: true }
  ).then(pack => {
    let randomNumber = Math.floor(Math.random() * Math.floor(10));
    console.log(randomNumber);
    Winner.create({ packageName, user: pack.entry[randomNumber] }).then(
      winner => {
        res.json(winner);
      }
    );
  });
  // Math.random() * (max - min) + min;
});

router.post("/winners", (req, res, next) => {
  let { packageName } = req.body;

  Winner.find({ packageName })
    .populate("user")
    .sort({ createdAt: -1 })
    .then(winners => {
      res.json(winners);
    });
});

router.post("/emailwinner", (req, res, next) => {
  // let { to } = req.body;
  const msg = {
    to: "nourcherifsoussi@gmail.com",
    from: "customer@fgambling.com",
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>"
  };
  sgMail.send(msg);
  res.json(msg);
});
module.exports = router;
