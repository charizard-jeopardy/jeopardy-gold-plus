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
  console.log("BackEnd: questionObj", questionObj);
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
    text: `SELECT d.dollarAmount, q.question
        FROM databases d 
        INNER JOIN questions q
        ON d.database_id = q.category_id`,
    rowMode: "array",
  };
  const getSystemDeisgnQuestions = {
    text: `SELECT s.dollarAmount, q.question
        FROM systemdesign s 
        INNER JOIN questions q
        ON s.systemdesign_id = q.category_id`,
    rowMode: "array",
  };
  const getGenTriviaQuestions = {
    text: `SELECT g.dollarAmount, q.question
        FROM gentrivia g 
        INNER JOIN questions q
        ON g.gentrivia_id = q.category_id`,
    rowMode: "array",
  };
  const getJavascriptQuestions = {
    text: `SELECT j.dollarAmount, q.question
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
  let frontendObject = {};
  const frontendArray = [];
  frontendResult.rows.forEach((el) => {
    frontendObject[`dollarAmount`] = el[0];
    frontendObject[`question`] = el[1];
    frontendArray.push(frontendObject);
    frontendObject = {};
  });
  let backendObject = {};
  const backendArray = [];
  backendResult.rows.forEach((el, index) => {
    backendObject[`dollarAmount`] = el[0];
    backendObject[`question`] = el[1];
    backendArray.push(backendObject);
    backendObject = {};
  });
  let databaseObject = {};
  const databaseArray = [];
  databaseResult.rows.forEach((el, index) => {
    databaseObject[`dollarAmount`] = el[0];
    databaseObject[`question`] = el[1];
    databaseArray.push(databaseObject);
    databaseObject = {};
  });
  let systemDesignObject = {};
  const systemDesignArray = [];
  systemDesignResult.rows.forEach((el, index) => {
    systemDesignObject[`dollarAmount`] = el[0];
    systemDesignObject[`question`] = el[1];
    systemDesignArray.push(systemDesignObject);
    systemDesignObject = {};
  });
  let javascriptObject = {};
  const javascriptArray = [];
  javascriptResult.rows.forEach((el, index) => {
    javascriptObject[`dollarAmount`] = el[0];
    javascriptObject[`question`] = el[1];
    javascriptArray.push(javascriptObject);
    javascriptObject = {};
  });
  let genTriviaObject = {};
  const genTriviaArray = [];
  genTriviaResult.rows.forEach((el, index) => {
    genTriviaObject[`dollarAmount`] = el[0];
    genTriviaObject[`question`] = el[1];
    genTriviaArray.push(genTriviaObject);
    genTriviaObject = {};
  });
  res.locals.frontendArray = frontendArray;
  res.locals.backendArray = backendArray;
  res.locals.systemDesignArray = systemDesignArray;
  res.locals.javascriptArray = javascriptArray;
  res.locals.databaseArray = databaseArray;
  res.locals.genTriviaArray = genTriviaArray;
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


  let twoHundred = [], fourHundred = [], sixHundred = [], eightHundred = [], oneThousand = [];
  
  const topic = [
    "frontend",
    "backend",
    "databases",
    "javascript",
    "systemDesign",
    "gentrivia",
  ];
  const dollars = [200, 400, 600, 800, 1000];
  for (let i = 0; i < topic.length; i += 1) {
    if (topic[i] === 'frontend') {
      frontendArray.forEach((el) => {
        if (el["dollarAmount"] === 200) twoHundred.push(el);
        if (el["dollarAmount"] === 400) fourHundred.push(el);
        if (el["dollarAmount"] === 600) sixHundred.push(el);
        if (el["dollarAmount"] === 800) eightHundred.push(el);
        if (el["dollarAmount"] === 1000) oneThousand.push(el);
      });
    }
    if (topic[i] === 'backend') {
      backendArray.forEach((el) => {
        if (el["dollarAmount"] === 200) twoHundred.push(el);
        if (el["dollarAmount"] === 400) fourHundred.push(el);
        if (el["dollarAmount"] === 600) sixHundred.push(el);
        if (el["dollarAmount"] === 800) eightHundred.push(el);
        if (el["dollarAmount"] === 1000) oneThousand.push(el);
      });
    }
    if (topic[i] === 'databases') {
        databaseArray.forEach((el) => {
          if (el["dollarAmount"] === 200) twoHundred.push(el);
          if (el["dollarAmount"] === 400) fourHundred.push(el);
          if (el["dollarAmount"] === 600) sixHundred.push(el);
          if (el["dollarAmount"] === 800) eightHundred.push(el);
          if (el["dollarAmount"] === 1000) oneThousand.push(el);
        });
      }
    if (topic[i] === 'systemDesign') {
      systemDesignArray.forEach((el) => {
        if (el["dollarAmount"] === 200) twoHundred.push(el);
        if (el["dollarAmount"] === 400) fourHundred.push(el);
        if (el["dollarAmount"] === 600) sixHundred.push(el);
        if (el["dollarAmount"] === 800) eightHundred.push(el);
        if (el["dollarAmount"] === 1000) oneThousand.push(el);
      });
    }
    if (topic[i] === 'javascript') {
        javascriptArray.forEach((el) => {
          if (el["dollarAmount"] === 200) twoHundred.push(el);
          if (el["dollarAmount"] === 400) fourHundred.push(el);
          if (el["dollarAmount"] === 600) sixHundred.push(el);
          if (el["dollarAmount"] === 800) eightHundred.push(el);
          if (el["dollarAmount"] === 1000) oneThousand.push(el);
        });
      }
      if (topic[i] === 'gentrivia') {
        genTriviaArray.forEach((el) => {
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
        let random = Math.floor(Math.random() * twoHundred.length);
        let gameQuestion = twoHundred[random];
        if (!gameQuestion) gameObject[topic[i]][200] = gameQuestion
        else gameObject[topic[i]][200] = gameQuestion.question;
      }
      if (dollars[j] === 400) {
        let random = Math.floor(Math.random() * fourHundred.length);
        let gameQuestion = fourHundred[random];
        if (!gameQuestion) gameObject[topic[i]][400] = gameQuestion
        else gameObject[topic[i]][400] = gameQuestion.question;
      }
      if (dollars[j] === 600) {
        let random = Math.floor(Math.random() * sixHundred.length);
        let gameQuestion = sixHundred[random];
        if (!gameQuestion) gameObject[topic[i]][600] = gameQuestion
        else gameObject[topic[i]][600] = gameQuestion.question;
      }
      if (dollars[j] === 800) {
        let random = Math.floor(Math.random() * eightHundred.length);
        let gameQuestion = eightHundred[random];
        if (!gameQuestion) gameObject[topic[i]][800] = gameQuestion
        else gameObject[topic[i]][800] = gameQuestion.question;
      }
      if (dollars[j] === 1000) {
        let random = Math.floor(Math.random() * oneThousand.length);
        let gameQuestion = oneThousand[random];
        if (!gameQuestion) gameObject[topic[i]][1000] = gameQuestion
        else gameObject[topic[i]][1000] = gameQuestion.question;
      }
    }
    twoHundred = [];
    fourHundred = [];
    sixHundred = [];
    eightHundred = [];
    oneThousand = [];
}
res.locals.gameObject = gameObject;
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
