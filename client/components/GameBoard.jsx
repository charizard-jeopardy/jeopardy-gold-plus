import React, { useState, useEffect } from 'react';
import Square from './Square.jsx';
import Questions from './Questions.jsx';
import MainContainer from '../container/MainContainer.jsx';
import Winner from './Winner.jsx';
import Lobby from './Lobby.jsx';

function GameBoard({ displayName }){
    const [view, setView] = useState(''); 
    const [question, setQuestion] = useState(''); 
    const [answer1, setAnswer1] = useState(''); 
    const [answer2, setAnswer2] = useState(''); 
    const [answer3, setAnswer3] = useState(''); 
    const [answer4, setAnswer4] = useState(''); 
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [divClass, setDivClass] = useState('answer-text'); 
    const [response, setResponse] = useState(''); 
    const [disabled, setDisable] = useState(false);
    const [winner, setWinner] = useState('');
    const [score, setScore] = useState('');

    const [renderGame, setRenderGame] = useState(false); 

    const renderAnswer = (className) => {
        setDivClass(className); 
        setResponse(className); 
    }
    
    const handleClick = (sid, nid) => {
        setView('q&a');
        gameFunc(sid, nid); 
        setDisable(true);
    }

    const returnToBoard = (e) => {
        e.preventDefault();
        setView('Game')
    }
    
    const gameFunc = async (sid, nid) => {
        // id.preventDefault();
        await fetch('/startGame')
        .then(response => response.json())
        .then(async data => {
            // setRenderGame(true); 
            console.log('data in gameFunc', data)
            for (const topicObj in data){
                if (sid === topicObj) {
                    for (const numObj in data[topicObj]){
                        if (nid == numObj) {
                            await setQuestion(data[topicObj][numObj].question); 
                            await setAnswer1(data[topicObj][numObj].answer1); 
                            await setAnswer2(data[topicObj][numObj].answer2); 
                            await setAnswer3(data[topicObj][numObj].answer3); 
                            await setAnswer4(data[topicObj][numObj].answer4); 
                            await setCorrectAnswer(data[topicObj][numObj].correctAnswer); 
                            await setView('q&a');
                }
            }
        }
        }
      })
      .catch((err) => console.error('gameBoard.jsx error fetching from database :', err));
    };

    // if (renderGame === false) {
        
    //     gameFunc(); 
    // }

    let topic = ['frontend', 'backend', 'systemDesign', 'databases', 'javascript', 'gentrivia'];
    let topicArr = [];
    topic.forEach(el => {
        topicArr.push(<div className="topic-square" key={el}>{el}</div>)
    }); 

    let boardArr = [];
    const money = [200, 400, 600, 800, 1000]; 
    for (let i = 0; i < topic.length; i++) {
        let qArr = [];
        let stringId = topic[i]; 
        money.forEach(el => {
            let numId = el; 
           qArr.push(<Square diasbled={disabled} stringId={stringId} numId={numId} id={topic[i] + el} className="q-square" key={el} value={el}  handleClick={handleClick}></Square>)
        });
        boardArr.push(<div id={topic[i]} className="column">{qArr}</div>);
    }
    if (view === 'q&a') {
        return (
            <div>
                <div className="questionAnswer">
                    <Questions response={response} divClass={divClass} renderAnswer={renderAnswer} q={question} a1={answer1} a2={answer2} a3={answer3} a4={answer4} ca={correctAnswer} />
                </div>
                <div>
                    <button id="return-to-board" onClick={returnToBoard}>Return to Board</button>
                </div>
            </div>
        ) 
    } 
    else if (view === 'winner') {
        return (
            <div>
                <div><Lobby /></div>
                <Winner />
            </div>
        )
    }
    else {
        return (
            <div id="game-board">
                <div><Lobby /></div>
                <h1>JEOPARDY: GOLD+ EDITION</h1>
                <p>Playing as {displayName}</p>
                <div className="topics">{topicArr}</div>
                <div className="q-board">{boardArr}</div>
            </div>
        )
    } 
}

export default GameBoard;


