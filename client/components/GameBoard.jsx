import React, { useState, useEffect } from 'react';
import Square from './Square.jsx';
import Questions from './Questions.jsx';
import MainContainer from '../container/MainContainer.jsx';

function GameBoard({ displayName }){
    console.log(displayName);
    // const questions = ''; 
    const [view, setView] = useState(''); 
    const [question, setQuestion] = useState(''); 
    const [answer1, setAnswer1] = useState(''); 
    const [answer2, setAnswer2] = useState(''); 
    const [answer3, setAnswer3] = useState(''); 
    const [answer4, setAnswer4] = useState(''); 
    const [correctAnswer, setCorrectAnswer] = useState(''); 

    const handleClick = (id) => {
        console.log('handleClick', id)
        setView('q&a');
        gameFunc(id); 
    }

    const gameFunc = async (id) => {
        id.preventDefault();
        fetch('/startGame')
        .then(response => response.json())
        .then((data) => {
            let stringId = ''; 
            let numId = ''; 
            for (let i = 0; i < id.length; i++) {
                typeof id[i] === 'string' ? stringId += id[i] : numId += id[i]; 
            };
            for (const topicObj in data){
                if (stringId === Object.keys(topicObj)[0]) {
                    for (const numObj in topicObj){
                        if (numId === Object.keys(numObj)[0]) {
                            setQuestion(numObj.question); 
                            setAnswer1(numObj.answer1); 
                            setAnswer2(numObj.answer2); 
                            setAnswer3(numObj.answer3); 
                            setAnswer4(numObj.answer4); 
                            setCorrectAnswer(numObj.correctAnswer); 
                            // renderQuestions(); 
                }
            }
        }
        }
      })
      .catch((err) => console.err('gameBoard.jsx error fetching from database :', err));
    };

    // const renderQuestions = () => {

    // }

    let topic = ['frontend', 'backend', 'systemDesign', 'databases', 'javascript', 'gentrivia'];
    let topicArr = [];
    topic.forEach(el => {
        topicArr.push(<div className="topic-square" key={el}>{el}</div>)
    }); 

    let boardArr = [];
    const money = ['200', '400', '600', '800', '1000']; 
    for (let i = 0; i < topic.length; i++) {
        let qArr = [];
        money.forEach(el => {
           qArr.push(<Square id={topic[i] + el} className="q-square" key={el} value={el}  handleClick={handleClick}></Square>)
        });
        boardArr.push(<div id={topic[i]} className="column">{qArr}</div>);
    }
    if (view === 'q&a') return (
        <div>{questionsArr}</div>
    ) 
    else return (
        <div id="game-board">
            <h1>JEOPARDY: GOLD+ EDITION</h1>
            <p>Playing as {displayName}</p>
            <div className="topics">{topicArr}</div>
            <div className="q-board">{boardArr}</div>
        </div>
    )
}

export default GameBoard;




[
    {
        questionId: "frontend$200",
        question: "question here", 
        answer1: "answer1 here", 
        correctAnswer: "correct answer here"
    }
]