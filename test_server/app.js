var express = require('express');
var app = express();
const port = 3001;

const userModel = require("./src/userModel");

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get("/getMembers", (req, res) => {
  userModel
    .getOrgMaster()
    .then((response) => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});