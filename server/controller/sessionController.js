const db = require("../models/jeopardyModel.js");

const sessionController = {};

sessionController.createSession = async (req, res, next) => {
  // userId comes from prior middleware for signin, login
  const userId = res.locals.userId;
  let ssid;
  const ssidGenerator = function () {
    return ssid = Math.floor(Math.random() * 100000);
  };
  ssid = await ssidGenerator();
  const verifyIdQuery = {
    text: "SELECT * FROM sessions WHERE ssid = ($1)",
    values: [ssid],
    rowMode: "array"
  };
  const verifyResult = await db.query(verifyIdQuery);
  if (verifyResult.rows[0]) ssid = await ssidGenerator();
  const createSSIDQuery = {
    text: "INSERT INTO sessions (ssid, user_id) VALUES ($1, $2)",
    values: [ssid, userId],
    rowMode: "array"
  };
  // console.log(verifyResult);
  await db.query(createSSIDQuery);
  res.locals.ssid = ssid;
  return next();
};

sessionController.verifySession = async (req, res, next) => {
  if (!req.cookies.ssid) return res.status(200).json({loggedIn: false})
  const { ssid } = req.cookies;
  const verifySessionQuery = {
    text: `SELECT u.user_id, username, displayName FROM users u
    INNER JOIN sessions s
    ON u.user_id = s.user_id 
    WHERE s.ssid = ($1)`,
    values: [ssid],
    rowMode: "array"
  }
  const sessionVar = await db.query(verifySessionQuery)
  console.log(sessionVar);
  if (!sessionVar.rows[0]){
    return res.status(200).json({loggedIn: false});
  } 
  console.log(sessionVar.rows[0]);
  const userObj = {
    user_id: sessionVar.rows[0][0],
    username: sessionVar.rows[0][1],
    displayName: sessionVar.rows[0][2],
    loggedIn: true
  }
  console.log(userObj);
  res.locals.userObj = userObj;
  return next();
};

module.exports = sessionController;
