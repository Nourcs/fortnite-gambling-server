const express = require("express");
const router = express.Router();
const User = require("../models/User");
/* GET home page */
router.get("/users", (req, res, next) => {
  User.find().then(users => {
    res.json(users);
  });
});

router.post("/newuser", (req, res, next) => {
  // res.json(req.body);
  let { uid, firstName, lastName, displayName, email, photoURL } = req.body;
  User.findOne({ uid }).then(user => {
    if (user) {
      res.json(user);
    } else {
      User.create({ uid, firstName, lastName, displayName, email, photoURL })
        .then(userInfo => {
          res.json(userInfo);
        })
        .catch(err => {
          console.error(err);
        });
    }
  });
});

module.exports = router;
