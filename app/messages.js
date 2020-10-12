const router = require("express").Router();
const db = require("../fileDB");

let errorMessage = {
  error: ''
};

router.get("/", (req, res) => {
  const messages = db.getItems();
  if (req.query.dateTime) {
    const dateTime = req.query.dateTime;
    const date = new Date(req.query.dateTime);
    if (isNaN(date.getDate())) {
      res.status(400);
      errorMessage.error = 'Invalid Date'
      res.send(errorMessage);
    } else {
      const index = messages.findIndex(messages => messages.dateTime === dateTime);
      const dateTimeArr = [];
      for (let i = index + 1; i < messages.length; i++) {
        dateTimeArr.push(messages[i]);
      };
      res.send(dateTimeArr);
    }
  } else {
    res.send(messages);
  };
});

router.post("/", (req, res) => {
  if (req.body.message === "" || req.body.author === "") {
    res.status(400);
    errorMessage.error = 'Author and message must be present in the request';
    res.send(errorMessage);
  } else {
    const messages = db.addItem(req.body);
    res.send(messages);
  };
});

module.exports = router;