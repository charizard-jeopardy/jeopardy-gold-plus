const db = require("../models/jeopardyModel.js");
const bcrypt = require("bcryptjs");

const authController = {};

authController.createUser = async (req, res, next) => {
  /*
    {
        "username": "aki",
        "email": "aki@aki.com",
        "password": "meow123",
        "displayName": "aki"
    }
  */
  const { username, password, email, displayName } = req.body;
  const verifyUsernameQuery = {
    text: "SELECT username FROM users WHERE username = ($1)",
    values: [username],
    rowMode: "array",
  };
  const verifyResults = await db.query(verifyUsernameQuery);
  if (verifyResults.rows[0]) {
    return res.status(200).json("Username already in use");
  }
  //figure out how to hash email
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const createUserQuery = {
    text: "INSERT INTO users (username, password, email, displayName) VALUES ($1, $2, $3, $4) RETURNING user_id, username, displayName",
    values: [username, hash, email, displayName],
    rowMode: "array",
  };
  const result = await db.query(createUserQuery);
  const userObj = {
    user_id: result.rows[0][0],
    username: result.rows[0][1],
    displayName: result.rows[0][2],
    loggedIn: true
  }
  res.locals.userObj = userObj;
  res.locals.userId = result.rows[0][0];
  return next();
};
///signup => createUser => assignCookie
//login => verifyUser => assignCookie
///startGame => verifySession
//signup & login => assign a cookie

authController.verifyUser = async (req, res, next) => {
  //expecting req.body to have username and password
  const { username, password } = req.body;
  const verifyUsernameQuery = {
    text: "SELECT password, user_id, username, displayName FROM users WHERE username = ($1)",
    values: [username],
    rowMode: "array",
  };
  const verifyResults = await db.query(verifyUsernameQuery);
  if (!verifyResults.rows[0])
    return res.status(200).json("Username does not exist");
  bcrypt.compare(password, verifyResults.rows[0][0], (err, match) => {
    if (err) console.log("Error in bcrypt compare: ", err);
    if (!match) return res.status(200).json("Incorrect password");
    const userObj = {
      user_id: verifyResults.rows[0][1],
      username: verifyResults.rows[0][2],
      displayName: verifyResults.rows[0][3],
      loggedIn: true
    }
    res.locals.userId = verifyResults.rows[0][1];
    res.locals.userObj = userObj;
    return next();
  });
};

module.exports = authController;
