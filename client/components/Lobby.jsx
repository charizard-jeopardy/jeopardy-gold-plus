import React from 'react';
import { useState, useEffect } from 'react';

function Lobby(props) {
  const { players, scores, gameStart } = props;
 
  console.log('players:')
  let Player1 = players[0];
  let Player2 = players[1];
  let Player3 = players[2];
  let Player4 = players[3];
  console.log(Player1);
  console.log(Player2);
  console.log(Player3);
  console.log(Player4)
    return(
        <div id="lobby-bar">
          {!gameStart ? (
            <div id="lobby-players">
              <h3 className="lobby-el">Player 1</h3>
              <h3 className="lobby-el">Player 2</h3>
              <h3 className="lobby-el">Player 3</h3>
              <h3 className="lobby-el">Player 4</h3>
            </div>
          ) : (
            <div id="lobby-players">
              <h3 className="lobby-el">{Player1.username}</h3>
              <h3 className="lobby-el">{Player2.username}</h3>
              <h3 className="lobby-el">{Player3.username}</h3>
              <h3 className="lobby-el">{Player4.username}</h3>
            </div>
          )}
            <div id="lobby-scores">                
                <h3 className="lobby-el">{Player1.points}</h3>
                <h3 className="lobby-el">{Player2.points}</h3>
                <h3 className="lobby-el">{Player3.points}</h3>
                <h3 className="lobby-el">{Player4.points}</h3>
            </div>
        </div>
    )
};


export default Lobby;