import React from 'react';
import Square from './Square.jsx';

function GameBoard(){

    let array = ['frontend', 'backend', 'system design', 'databases', 'javascript', 'general trivia'];
    let topicArr = [];
    array.forEach(el => {
        topicArr.push(<div className="topic-square" key={el}>{`${el}`}</div>)
    }); 
    let money = ['$200', '$400', '$600', '$800', '$1000']; 
    let qArr = [];
    money.forEach(el => {
        qArr.push(<Square className="q-square" key={el}>{`${el}`}</Square>)
    });


    return(
        <div id="game-board">
            <h1>THIS IS THE GAME BOARD</h1>
            <div className="topics">{topicArr}</div>
            <div className="column">{qArr}</div>
        </div>
    )
}

export default GameBoard;