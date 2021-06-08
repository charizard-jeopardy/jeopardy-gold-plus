const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const auth = require("./controller/authController.js");
const game = require("./controller/gameController.js");
const highScore = require("./controller/highScoreController.js");
const model = require("./models/jeopardyModel.js");
const session = require("./controller/sessionController.js");

//** Port Set Up **//
const PORT = 3000;

//** initialize express server **//
const app = express();

//** Serve all compiled files when running the production build **//
app.use(express.static(path.resolve(__dirname, "./../client")));
app.use(cookieparser());
// app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//** Routers **/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./../client/index.html"));
});

//** Sign Up *//
app.post("/signup", auth.createUser, session.createSession, (req, res) => {
  res.status(200).json("Successfully Signed Up");
});

//** Login **//
app.post("/login", auth.verifyUser, session.createSession, (req, res) => {
  res.status(200).json("Successfully Logged In");
});

//** Start Game **//
app.get("/startGame", (req, res) => {
  res.status(200).json();
});

//** Update High Score **//
app.post("updateHighScore", (req, res) => {
  res.status(200).json();
});

//** 404 Error Handler **//
app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/index.html"))
);
app.use("/*", (req, res) =>
  res.status(404).send("Whoops, somebody fucked up!")
);

//** Global Error Handler **//
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//** App Listener  **//
app.listen(PORT, () => {
  if (process.env.DEMO_MODE)
    console.log("~~~ D E M O   M O D E   A C T I V A T E D ~~~");
  console.log(`Charizard used flamethrower on ${PORT} 🔥`);
});

//if testing using supertest
module.exports = app;
