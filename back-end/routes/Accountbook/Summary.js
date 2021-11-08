const express = require("express");
const router = express.Router();

var summary = {    
    monthlyLimit: 4000,
    monthlySpending: 0
}

const transactions = [
    {"name":"Steak", "date": "11/4/2021", "amount": 13, "type": "Food"},
    {"name":"iphone", "date": "11/4/2021", "amount": 1000, "type": "School"},
    {"name":"macbook pro", "date": "11/4/2021", "amount": 2000, "type": "School"},
    {"name":"pencil", "date": "11/4/2021", "amount": 1.9, "type": "School"},
    {"name":"shirt", "date": "11/4/2021", "amount": 50, "type": "Clothing"}
]

transactions.forEach(item => {
    summary.monthlySpending += item.amount
})

router.get('/get-monthly-budget', (req, res) => {
    res.json(summary)
})
  
router.post("/set-monthly-budget",(req, res) => {
    summary.monthlyLimit = req.body.amount
    res.redirect('http://localhost:3000/account_book');
    res.status(200)
})

module.exports = router