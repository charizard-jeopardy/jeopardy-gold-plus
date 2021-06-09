const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const auth = require("./controller/authController.js");
const game = require("./controller/gameController.js");
const highScore = require("./controller/highScoreController.js");
const model = require("./models/jeopardyModel.js");
const session = require("./controller/sessionController.js");
const cookie = require("./controller/cookieController.js");

//** Port Set Up **//
const PORT = 3000;

//** initialize express server **//
const app = express();

//** Serve all compiled files when running the production build **//
app.use(express.static(path.resolve(__dirname, "./../client")));
app.use('/build', express.static(path.join(__dirname, '../build')));
app.use(cookieparser());
// app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//** Routers **/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./../client/index.html"));
});

app.get(
  "/checkSession",
  session.verifySession,
  (req, res) => {
    res.status(200).json(res.locals.userObj);
  }
)

//** Sign Up *//
app.post(
  "/signup",
  auth.createUser,
  session.createSession,
  cookie.createCookie,
  (req, res) => {
    //return user_id, displayName, loggedIn: true
    res.status(200).json(res.locals.userObj);
  }
);

//** Login **//
app.post(
  "/login",
  auth.verifyUser,
  session.createSession,
  cookie.createCookie,
  (req, res) => {
    //return user_id, displayName, loggedIn: true
    res.status(200).json(res.locals.userObj);
  }
);

//** Start Game **//
app.get("/startGame",
  game.getAllCategories,
  game.getAllQuestions,
  game.sortAndPickQuestions,
  (req, res) => {
    const { gameObject } = res.locals;
    res.status(200).json(gameObject);
  });

//** Add questions to database **//
app.post("/postQuestion", 
  game.addQuestion,
  (req, res) => {
  res.status(200).json('question added to database!');
})


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
