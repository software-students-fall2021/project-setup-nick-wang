const express = require("express");
const router = express.Router();
const axios = require("axios"); // middleware for making requests to APIs
require("dotenv").config({ silent: true }); // Load env variables


router.get("/Account_transaction_data", (req, res, next) => {
    // insert the environmental variable into the URL we're requesting
    axios
      .get(`${process.env.API_BASE_URL}?key=${process.env.API_SECRET_KEY}&num=10`)
      .then((apiResponse) => res.json(apiResponse.data)) // pass data along directly to client
      .catch((err) => next(err)); // pass any errors to express
});

router.post("/edit_transaction_data",(req, res) => {
    summary.monthlyLimit = req.body.amount
    res.redirect('http://localhost:3000/account_book/category');
    res.status(200)
})
  
module.exports = router