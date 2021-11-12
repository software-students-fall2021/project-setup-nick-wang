const express = require("express");
const router = express.Router();

const diaries = [
    {
        date: '11-1-2021',
        content: 'today is 11-1-2021'
    },
    {
        date: '11-2-2021',
        content: 'today is 11-2-2021'
    },
    {
        date: '01-03-2021',
        content: 'today is 01-03-2021'
    },
    {
        date: '01-04-2021',
        content: 'today is 01-04-2021'
    }
  ]

  router.get('/Details/:date',(req, res) => {
    res.json(diaries.filter(diaries => diaries.date === req.params.date));
  });
  
  router.put('/Details/:date',(req, res) => {
    const targetDiary = diaries.filter(diaries => diaries.date === req.params.date);
    targetDiary[0].content = req.body.content;
    res.status(200);
    res.send();
  });

  module.exports = router