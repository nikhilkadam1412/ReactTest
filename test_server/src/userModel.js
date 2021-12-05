const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "reactTest",
  password: "admin",
  port: 5432,
});

const bcrypt = require("bcrypt");
const jwtGenerator = require("./utils/jwtGenerator");
const authorize = require("./middleware/authorize");

function validEmail(userEmail) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
}


// For testing purpose
const getOrgMaster = () => {
    return new Promise(function (resolve, reject) {
        pool.query(
            'SELECT * FROM "public".add_user',
            (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            }
        );
    });
};

// Register User ============================
const registerUser = async (body) => {
    const { user, email, password } = body;
  
    try {
      if (!validEmail(email)) {
        return "Invalid Email";
      }
      const getUser = await pool.query(
        'SELECT * FROM "public".add_user WHERE email = $1',
        [email]
      );
  
      if (getUser.rows.length > 0) {
        return "User with same Email ID already exist!";
      }
  
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
  
      const newUser = await pool.query(
        'INSERT INTO "public".add_user (username, email, password) VALUES ($1, $2, $3) RETURNING *',[user, email, bcryptPassword]);

        console.log('newUser',newUser);
  
        if (getUser.rows.length > 0) {
          return "User registered!";
        }
  
      const jwtToken = jwtGenerator(newUser.rows[0].uid);
  
      return { jwtToken };
    } catch (err) {
      console.error(err.message);
      // res.status(500).send("Server error");
    }
  };

// User Login =======================
const login = async (body) => {
  const { userName, passWord } = body;
  let UserId;
  try {
    const user = await pool.query(
      'select * from "public".add_user WHERE email = $1',
      [userName]
    );

    if (user.rows.length === 0) {
      return { res: "User not exist" };
    }

    const validPassword = await bcrypt.compare(passWord, user.rows[0].password);

    if (!validPassword) {
      return { res: "Password or UserName is incorrect" };
    }
    UserId = user.rows[0].uid;
    const jwtToken = await jwtGenerator(user.rows[0].uid);
    console.log('jwtToken',jwtToken)

    return { jwtToken, UserId };
  } catch (err) {
    // console.error(err.message);
    res.status(500).send("Server error");
  }
};

const addTask = async (body) => {
  const {taskName, deadline, taskPriority, iscomplete, uid} = body;
  
  try {
    const newTask = await pool.query(
      'INSERT INTO "public".task_list (task_name, task_deadline, task_priority, is_complete, uid) VALUES ($1, $2, $3, $4, $5) RETURNING *',[taskName, deadline, taskPriority, iscomplete, uid]);

      console.log('newTask',newTask);

      if (newTask.rows.length > 0) {
        return "Task Added!";
      } else {
        return "Something went wrong!";
      }
  } catch (err) {
    console.error(err.message);
  }

}

// Get list of tasks
const getTaskList = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      'SELECT * FROM "public".task_list',
      (error, results) => {
          if (error) {
              reject(error);
          }
          resolve(results.rows);
      }
    );
  });
}

// delete Task
const deleteTask = (req, res) => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(req.params.id);
    pool.query(
      'DELETE FROM "public".task_list WHERE task_id = $1',
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Task deleted with ID: ${id}`);
      }
    );
  });
};

// update Task as complete/incomplete
const updateAsComplete = async (req, res) => {
  const id = parseInt(req.params.id);
  const {isComplete} = req.body;

  const taskUpdate = await pool.query(
    'UPDATE "public".task_list SET is_complete = $1 WHERE task_id = $2',
    [isComplete, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      
      console.log('update task results',results);
    })

}

// Edit the task
const getTaskById = (req, res) => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(req.params.id);

    pool.query(
      'SELECT task_id, task_name, task_deadline, task_priority FROM "public".task_list WHERE task_id = $1',
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(results.rows);
      }
    );
  });
}

// update Task
const updateTask = async (req, res) => {
  const id = parseInt(req.params.id);
  const { task_name, task_deadline, task_priority } = req.body;

  try {
    const updatedTask = await pool.query(
      'UPDATE "public".task_list SET task_name = $1, task_deadline = $2, task_priority = $3 WHERE task_id = $4',
      [task_name, task_deadline, task_priority, id],
      (error, results) => {
        if (error) {
          throw error;
        }

        return "Task Updated!";

      })
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
    getOrgMaster,
    registerUser,
    login,
    addTask,
    getTaskList,
    deleteTask,
    updateAsComplete,
    getTaskById,
    updateTask
};