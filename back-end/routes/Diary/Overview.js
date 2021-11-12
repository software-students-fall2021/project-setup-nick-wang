var express = require("express");
var router = express.Router();
var URL = require("url");

const testYear = [
  { key: 2010, text: 2010, value: 2010 },
  { key: 2011, text: 2011, value: 2011 },
  { key: 2012, text: 2012, value: 2012 },
  { key: 2013, text: 2013, value: 2013 },
  { key: 2014, text: 2014, value: 2014 },
  { key: 2015, text: 2015, value: 2015 },
  { key: 2016, text: 2016, value: 2016 },
  { key: 2017, text: 2017, value: 2017 },
  { key: 2018, text: 2018, value: 2018 },
  { key: 2019, text: 2019, value: 2019 },
  { key: 2020, text: 2020, value: 2020 },
  { key: 2021, text: 2021, value: 2021 },
];

const testMonth = [
  { key: 1, text: 1, value: 1 },
  { key: 2, text: 2, value: 2 },
  { key: 3, text: 3, value: 3 },
  { key: 4, text: 4, value: 4 },
  { key: 5, text: 5, value: 5 },
  { key: 6, text: 6, value: 6 },
  { key: 7, text: 7, value: 7 },
  { key: 8, text: 8, value: 8 },
  { key: 9, text: 9, value: 9 },
  { key: 10, text: 10, value: 10 },
  { key: 11, text: 11, value: 11 },
  { key: 12, text: 12, value: 12 },
];

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
