const db = require("../models/jeopardyModel.js");
const bcrypt = require("bcryptjs");

const authController = {};

authController.createUser = async (req, res, next) => {
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
    text: "INSERT INTO users (username, password, email, displayName) VALUES ($1, $2, $3, $4)",
    values: [username, hash, email, displayName],
    rowMode: "array",
  };
  await db.query(createUserQuery);
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
    text: "SELECT password, user_id FROM users WHERE username = ($1)",
    values: [username],
    rowMode: "array",
  };
  const verifyResults = await db.query(verifyUsernameQuery);
  if (!verifyResults.rows[0])
    return res.status(200).json("Username does not exist");
  bcrypt.compare(password, verifyResults.rows[0][0], (err, match) => {
    if (err) console.log("Error in bcrypt compare: ", err);
    if (!match) return res.status(200).json("Incorrect password");
    res.locals.userId = verifyResults.rows[0][1];
    return next();
  });
};

module.exports = authController;
