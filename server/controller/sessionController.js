const db = require("../models/jeopardyModel.js");

const sessionController = {};

sessionController.createSession = async (req, res, next) => {
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

module.exports = sessionController;
