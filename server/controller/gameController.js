const db = require("../models/jeopardyModel.js");
const app = require("../server.js");
const { get } = require("../server.js");

const gameController = {};
//dont forget to try to randomize object order for randow answer assignment
gameController.addQuestion = async (req, res, next) => {
  const {
    category,
    dollarAmount,
    question,
    answer1,
    answer2,
    answer3,
    answer4,
    correctAnswer,
  } = req.body;
  //frontend, backend, gentrivia, javascript, systemdesign
  //f_386734867

  const questionAdder = async () => {
    let query;
    if (category === "frontend") {
      let firstId = "f_";
      let num = Math.floor(Math.random() * 100000);
      let newId = (firstId += num);
      query = {
        text: "INSERT INTO frontend (frontend_id, dollarAmount) VALUES ($1, $2) RETURNING frontend_id",
        values: [newId, dollarAmount],
        rowMode: "array",
      };
      return query;
    }
    if (category === "backend") {
      let firstId = "b_";
      let num = Math.floor(Math.random() * 100000);
      let newId = (firstId += num);
      query = {
        text: "INSERT INTO backend (backend_id, dollarAmount) VALUES ($1, $2) RETURNING backend_id",
        values: [newId, dollarAmount],
        rowMode: "array",
      };
      return query;
    }
    if (category === "gentrivia") {
      let firstId = "g_";
      let num = Math.floor(Math.random() * 100000);
      let newId = (firstId += num);
      query = {
        text: "INSERT INTO genTrivia (genTrivia_id, dollarAmount) VALUES ($1, $2) RETURNING genTrivia_id",
        values: [newId, dollarAmount],
        rowMode: "array",
      };
      return query;
    }
    if (category === "javascript") {
      let firstId = "j_";
      let num = Math.floor(Math.random() * 100000);
      let newId = (firstId += num);
      query = {
        text: "INSERT INTO javascript (javascript_id, dollarAmount) VALUES ($1, $2) RETURNING javascript_id",
        values: [newId, dollarAmount],
        rowMode: "array",
      };
      return query;
    }
    if (category === "systemdesign") {
      let firstId = "s_";
      let num = Math.floor(Math.random() * 100000);
      let newId = (firstId += num);
      query = {
        text: "INSERT INTO systemdesign (systemdesign_id, dollarAmount) VALUES ($1, $2) RETURNING systemdesign_id",
        values: [newId, dollarAmount],
        rowMode: "array",
      };
      return query;
    };    
    if (category === "databases") {
      let firstId = "d_";
      let num = Math.floor(Math.random() * 100000);
      let newId = (firstId += num);
      query = {
        text: "INSERT INTO databases (database_id, dollarAmount) VALUES ($1, $2) RETURNING database_id",
        values: [newId, dollarAmount],
        rowMode: "array",
      };
      return query;
    } else {
      res.status(200).json("invalid category");
    }
  };
  const queryString = await questionAdder();
  // console.log('AFter query function')
  const result = await db.query(queryString);
  const categoryId = result.rows[0][0];
  const questionObj = {
    question: question,
    answer1: answer1,
    answer2: answer2,
    answer3: answer3,
    answer4: answer4,
    correctAnswer: correctAnswer,
  };
  console.log(questionObj);
  const questionQuery = {
    text: `INSERT INTO questions (category_id, question) VALUES ($1, $2)`,
    values: [categoryId, questionObj],
    rowMode: "array",
  };
  await db.query(questionQuery);
  return next();
};

//render an array of all categories from the categories table
//place in gameObject.categories
gameController.getAllCategories = async (req, res, next) => {
  const getCatagories = {
    text: `SELECT topic FROM categories`,
    rowMode: "array",
  };
  const result = await db.query(getCatagories);
  const catagoryArray = result.rows.reduce(function (prev, curr) {
    return prev.concat(curr);
  }, []);
  const gameObject = {};
  gameObject.categories = catagoryArray;
  res.locals.gameObject = gameObject;
  return next();
};

gameController.getAllQuestions = async (req, res, next) => {
  const getFrontendQuestions = {
    text: `SELECT f.dollarAmount, q.question
        FROM frontend f 
        INNER JOIN questions q
        ON f.frontend_id = q.category_id`,
    rowMode: "array",
  };
  const getBackendQuestions = {
    text: `SELECT b.dollarAmount, q.question
        FROM backend b 
        INNER JOIN questions q
        ON b.backend_id = q.category_id`,
    rowMode: "array",
  };
  const getDatabaseQuestions = {
    text: `SELECT f.dollarAmount, q.question
        FROM database d 
        INNER JOIN questions q
        ON d.database_id = q.category_id`,
    rowMode: "array",
  };
  const getSystemDeisgnQuestions = {
    text: `SELECT s.dollarAmount, q.question
        FROM systemdesign s 
        INNER JOIN questions q
        ON s.systemdesign = q.category_id`,
    rowMode: "array",
  };
  const getGenTriviaQuestions = {
    text: `SELECT g.dollarAmount, q.question
        FROM genTrivia g 
        INNER JOIN questions q
        ON g.genTrivia_id = q.category_id`,
    rowMode: "array",
  };
  const getJavascriptQuestions = {
    text: `SELECT f.dollarAmount, q.question
        FROM javascript j 
        INNER JOIN questions q
        ON j.javascript_id = q.category_id`,
    rowMode: "array",
  };
  const frontendResult = await db.query(getFrontendQuestions);
  const backendResult = await db.query(getBackendQuestions);
  const databaseResult = await db.query(getDatabaseQuestions);
  const systemDesignResult = await db.query(getSystemDeisgnQuestions);
  const genTriviaResult = await db.query(getGenTriviaQuestions);
  const javascriptResult = await db.query(getJavascriptQuestions);
  // console.log(frontendResult.rows);
  let frontendObject = {};
  const frontendArray = [];
  frontendResult.rows.forEach((el) => {
    frontendObject[`dollarAmount`] = el[0];
    frontendObject[`question`] = el[1];
    frontendArray.push(frontendObject);
    frontendObject = {};
  });
  // const backendObject = {};
  // backendResult.rows.forEach((el, index) => {
  //   backendObject[`dollarAmount:${index}`] = el[0];
  //   backendObject[`question:${index}`] = el[1];
  // });
  // const databaseObject = {};
  // databaseResult.rows.forEach((el, index) => {
  //   databaseObject[`dollarAmount:${index}`] = el[0];
  //   databaseObject[`question:${index}`] = el[1];
  // });
  // const systemDesignObject = {};
  // systemDesignResult.rows.forEach((el, index) => {
  //   systemDesignObject[`dollarAmount:${index}`] = el[0];
  //   systemDesignObject[`question:${index}`] = el[1];
  // });
  // const javascriptObject = {};
  // javascriptResult.rows.forEach((el, index) => {
  //   javascriptObject[`dollarAmount:${index}`] = el[0];
  //   javascriptObject[`question:${index}`] = el[1];
  // });
  // const genTriviaObject = {};
  // genTriviaResult.rows.forEach((el, index) => {
  //   genTriviaObject[`dollarAmount:${index}`] = el[0];
  //   genTriviaObject[`question:${index}`] = el[1];
  // });
  res.locals.frontendArray = frontendArray;
  //   res.locals.backendObject = backendObject;
  //   res.locals.systemDesignObject = systemDesignObject;
  //   res.locals.javascriptObject = javascriptObject;
  //   res.locals.databasesObject = databaseObject;
  //   res.locals.genTriviaObject = genTriviaObject;
  // console.log(res.locals.frontendArray);
  return next();
};

gameController.sortAndPickQuestions = async (req, res, next) => {
  const allQuestionsArray = [];

  const {
    frontendArray,
    backendArray,
    systemDesignArray,
    javascriptArray,
    databaseArray,
    genTriviaArray,
    gameObject,
  } = res.locals;
  allQuestionsArray.push(frontendArray);
  let twoHundred = [];
  let fourHundred = [];
  let sixHundred = [];
  let eightHundred = [];
  let oneThousand = [];
  //   allQuestionsArray.push()
  
  const topic = [
    "frontend",
    "backend",
    "databases",
    "javascript",
    "systemDesign",
    "genTrivia",
  ];
  // console.log("two hundred array");
  // console.log(twoHundred);
  const dollars = [200, 400, 600, 800, 1000];
  for (let i = 0; i < topic.length; i += 1) {
    if (topic[i] === 'frontend') {
      frontendArray.forEach((el) => {
        console.log("in the foreach!!!!");
        if (el["dollarAmount"] === 200) twoHundred.push(el);
        if (el["dollarAmount"] === 400) fourHundred.push(el);
        if (el["dollarAmount"] === 600) sixHundred.push(el);
        if (el["dollarAmount"] === 800) eightHundred.push(el);
        if (el["dollarAmount"] === 1000) oneThousand.push(el);
      });
    }
    if (topic[i] === 'backend') {
      backendArray.forEach((el) => {
        console.log("in the foreach!!!!");
        if (el["dollarAmount"] === 200) twoHundred.push(el);
        if (el["dollarAmount"] === 400) fourHundred.push(el);
        if (el["dollarAmount"] === 600) sixHundred.push(el);
        if (el["dollarAmount"] === 800) eightHundred.push(el);
        if (el["dollarAmount"] === 1000) oneThousand.push(el);
      });
    }
    if (topic[i] === 'database') {
        databaseArray.forEach((el) => {
          console.log("in the foreach!!!!");
          if (el["dollarAmount"] === 200) twoHundred.push(el);
          if (el["dollarAmount"] === 400) fourHundred.push(el);
          if (el["dollarAmount"] === 600) sixHundred.push(el);
          if (el["dollarAmount"] === 800) eightHundred.push(el);
          if (el["dollarAmount"] === 1000) oneThousand.push(el);
        });
      }
    if (topic[i] === 'systemdesign') {
      systemdesign.forEach((el) => {
        console.log("in the foreach!!!!");
        if (el["dollarAmount"] === 200) twoHundred.push(el);
        if (el["dollarAmount"] === 400) fourHundred.push(el);
        if (el["dollarAmount"] === 600) sixHundred.push(el);
        if (el["dollarAmount"] === 800) eightHundred.push(el);
        if (el["dollarAmount"] === 1000) oneThousand.push(el);
      });
    }
    if (topic[i] === 'javascript') {
        javascriptArray.forEach((el) => {
          console.log("in the foreach!!!!");
          if (el["dollarAmount"] === 200) twoHundred.push(el);
          if (el["dollarAmount"] === 400) fourHundred.push(el);
          if (el["dollarAmount"] === 600) sixHundred.push(el);
          if (el["dollarAmount"] === 800) eightHundred.push(el);
          if (el["dollarAmount"] === 1000) oneThousand.push(el);
        });
      }
      if (topic[i] === 'genTrivia') {
        genTriviaArray.forEach((el) => {
          console.log("in the foreach!!!!");
          if (el["dollarAmount"] === 200) twoHundred.push(el);
          if (el["dollarAmount"] === 400) fourHundred.push(el);
          if (el["dollarAmount"] === 600) sixHundred.push(el);
          if (el["dollarAmount"] === 800) eightHundred.push(el);
          if (el["dollarAmount"] === 1000) oneThousand.push(el);
        });
      }
    gameObject[topic[i]] = {};
    for (let j = 0; j < dollars.length; j += 1) {
      if (dollars[j] === 200) {
        console.log("in the nested for loops!!!!!");
        let random = Math.floor(Math.random() * twoHundred.length);
        console.log("after random!!!");
        let gameQuestion = twoHundred[random];
        gameObject[topic[i]][200] = gameQuestion;
      }
      if (dollars[j] === 400) {
        let random = Math.floor(Math.random() * fourHundred.length);
        let gameQuestion = fourHundred[random];
        gameObject[topic[i]][400] = gameQuestion;
      }
      if (dollars[j] === 600) {
        let random = Math.floor(Math.random() * sixHundred.length);
        let gameQuestion = sixHundred[random];
        gameObject[topic[i]][600] = gameQuestion;
      }
      if (dollars[j] === 800) {
        let random = Math.floor(Math.random() * eightHundred.length);
        let gameQuestion = eightHundred[random];
        gameObject[topic[i]][800] = gameQuestion;
      }
      if (dollars[j] === 1000) {
        let random = Math.floor(Math.random() * oneThousand.length);
        let gameQuestion = oneThousand[random];
        gameObject[topic[i]][1000] = gameQuestion;
      }
    }
    twoHundred = [];
    fourHundred = [];
    sixHundred = [];
    eightHundred = [];
    oneThousand = [];
}
  console.log(gameObject);
  return next();
};

//   const questionsArray = [];
//   questionsArray.push;

//   //function to slice :... off of question and dollar in each object and put each one in an array
//   //put all questions with the same dollar and in same category in an array
//   //generate random number between 0 and that array.length - 1
//   //grab the element at random number index and put in our final object
//};
/*



//go into each category tables and grab ids and dollar amounts (all columns)

//return the dollarAmount from category table and questions json from questions table where the category_ids are equal
  //do this for all the tables
  //create the object <question_category>: {
      200: {question object},
      400: {question object},
      600: {question object},
      800: {question object},
      1000: {question object}
    }


//render all questions from a category:
//sort into seperate arrays by dollar amount
//randomly pick one from each dollar amount


gameObject = {
  categories: ['..', ...]
  <question_category>: {
    200: {question object},
    400: {question object},
    600: {question object},
    800: {question object},
    1000: {question object}
  }
}

question object = {
  "question": "In 2013, the React Library was released by this company",
  "answer1": "What is Google",
  "answer2": "What is FaceBook",
  "answer3": "What is Yahoo",
  "answer4": "What is Amazon",
  "correctAnswer": "What is FaceBook"
}
*/

module.exports = gameController;

// {
//     "category": "frontend",
//     "dollarAmount": 200,
//     "question": "In 2013, the React Library was released by this company",
//     "answer1": "What is Google",
//     "answer2": "What is FaceBook",
//     "answer3": "What is Yahoo",
//     "answer4": "What is Amazon",
//     "correctAnswer": "What is FaceBook"
//   }
