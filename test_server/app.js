var express = require('express');
var app = express();
const port = 3001;

const cors = require("cors");
app.use(cors());

const userModel = require("./src/userModel");
const validInfo = require("./src/middleware/validInfo");
const authorize = require("./src/middleware/authorize");

// Cors configuration
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

/**************API URLS******************/

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

// Register User
app.post("/registerUser", (req, res) => {
  userModel
    .registerUser(req.body)
    .then((response) => {
      console.log('response',response)
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// User Login
app.post("/loginUser", (req, res) => {
  userModel
    .login(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});


// Add Task
app.post("/addTask", (req, res) => {
  userModel
    .addTask(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// get list of Task
app.get("/taskList", (req, res) => {
  userModel
    .getTaskList()
    .then((response) => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Delete task
app.delete("/delete/:id", (req, res) => {
  userModel
    .deleteTask(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// update task as Complete/Incomplete
app.put("/updateAsComplete/:id", (req, res) => {
  userModel
    .updateAsComplete(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/edit/:id", (req, res) => {
  userModel
    .getTaskById(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/updateTask/:id", (req, res) => {
  userModel
    .updateTask(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Verify user everytime when page load
app.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});