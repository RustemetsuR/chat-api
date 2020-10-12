const express = require("express");
const messages = require("./app/messages");
const cors = require("cors");
const db = require("./fileDB");
const app = express();
const port = 8000;

db.init();

app.use(cors());
app.use(express.json());
app.use("/messages", messages);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});