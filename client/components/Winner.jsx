import React from 'react';
import GameBoard from './GameBoard.jsx';

const winner = "Aki";
const score = "90000000"

function Winner({ winner }){
    return(
        <div id="winner-box">
            <div id="winners-circle">
                <h1>Congratulations, {winner}!!!</h1>
                <h2>You win!</h2>
                <p>{score} pts</p>
            </div>
        </div>
    )
}



export default Winner;