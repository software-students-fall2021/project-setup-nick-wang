var express = require("express");
var router = express.Router();
var URL = require("url");


const testWordCloud = [
  { text: "nam", value: 33 },
  { text: "pretium", value: 48 },
  { text: "etiam", value: 58 },
  { text: "augue", value: 26 },
  { text: "aliquam", value: 56 },
  { text: "velit", value: 87 },
  { text: "montes", value: 22 },
  { text: "luctus", value: 85 },
  { text: "quisque", value: 32 },
  { text: "non", value: 28 },
  { text: "tincidunt", value: 7 },
  { text: "congue", value: 76 },
  { text: "morbi", value: 37 },
  { text: "ipsum", value: 86 },
  { text: "lorem", value: 59 },
  { text: "sed", value: 92 },
  { text: "proin", value: 1 },
  { text: "enim", value: 70 },
  { text: "nullam", value: 75 },
  { text: "maecenas", value: 19 },
  { text: "ut", value: 98 },
  { text: "vestibulum", value: 91 },
  { text: "sit", value: 64 },
  { text: "aenean", value: 50 },
  { text: "morbi", value: 14 },
  { text: "curabitur", value: 19 },
  { text: "eu", value: 63 },
  { text: "sit", value: 31 },
  { text: "suscipit", value: 15 },
  { text: "morbi", value: 91 },
  { text: "nulla", value: 10 },
  { text: "nibh", value: 54 },
  { text: "ante", value: 1 },
  { text: "in", value: 66 },
  { text: "est", value: 1 },
  { text: "fringilla", value: 17 },
  { text: "et", value: 38 },
  { text: "quis", value: 69 },
  { text: "potenti", value: 94 },
  { text: "augue", value: 84 },
  { text: "quam", value: 93 },
  { text: "sit", value: 54 },
  { text: "vitae", value: 85 },
  { text: "pellentesque", value: 62 },
  { text: "vestibulum", value: 85 },
  { text: "sit", value: 72 },
  { text: "nascetur", value: 78 },
  { text: "tempor", value: 17 },
  { text: "luctus", value: 38 },
  { text: "duis", value: 64 },
];

router.get("/diary/word-cloud", function (req, res) {
  var params = URL.parse(req.url, true).query;
  if (params.id == "year") {
    res.json(testYear);
  } else if (params.id == "month") {
    res.json(testMonth);
  } else {
    res.json(testWordCloud);
  }
});

module.exports = router;
