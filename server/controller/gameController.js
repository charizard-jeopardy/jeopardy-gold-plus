const db = require("../models/jeopardyModel.js");

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
  const questionQuery = {
    text: `INSERT INTO questions (category_id, question) VALUES ($1, $2)`,
    values: [categoryId, questionObj],
    rowMode: "array",
  };
  await db.query(questionQuery);
  return next();
  };
};


/*
//render an array of all categories from the categories table
//place in gameObject.categories

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
