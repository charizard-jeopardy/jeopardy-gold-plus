const db = require('../models/jeopardyModel.js');

const cookieController = {};



cookieController.createCookie = (req, res, next) =>{
  //utilize the ssid created in the sessionController.createSession, 
  //to assign a cookie with a value of the ssid
  const ssid = res.locals.ssid;
  res.cookie('ssid', ssid, {httpOnly: true, maxAge: 10800000});
  return next();
};




module.exports = cookieController;