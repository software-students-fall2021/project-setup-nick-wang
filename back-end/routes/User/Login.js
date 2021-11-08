var express = require("express");
var router = express.Router();

var jwt = require("jsonwebtoken");
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "tasmanianDevil";

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log("payload received", jwt_payload);
  // usually this would be a database call:
  var user = users.find((user) => user.id === jwt_payload.id);
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);
router.use(passport.initialize());

// =======================================
var users = [
  {
    id: 1,
    name: "Admin",
    password: "123456",
  },
  {
    id: 2,
    name: "Zack",
    password: "123456",
  },
];
// =======================================

router.post("/login", function (req, res) {
  if (req.body.name && req.body.password) {
    var name = req.body.name;
    var password = req.body.password;
  }
  // usually this would be a database call:
  var user = users.find((user) => user.name === name);
  if (!user) {
    res.status(401).json({ message: "no such user found" });
  }

  if (user.password === password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = { id: user.id };
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({ message: "ok", token: token });
  } else {
    res.status(401).json({ message: "passwords did not match" });
  }
});

module.exports = router;
