import React from 'react';
import { useState, useEffect } from 'react';

function Lobby(props) {
  const { players, scores, gameStart } = props;
 
  console.log('players:')
  const { Player1, Player2, Player3, Player4 } = players;
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
              <h3 className="lobby-el">{Player1}</h3>
              <h3 className="lobby-el">{Player2}</h3>
              <h3 className="lobby-el">{Player3}</h3>
              <h3 className="lobby-el">{Player4}</h3>
            </div>
          )}
            
            <div id="lobby-scores">                
                <h3 className="lobby-el">1000</h3>
                <h3 className="lobby-el">1000</h3>
                <h3 className="lobby-el">1000</h3>
                <h3 className="lobby-el">1000</h3>
            </div>
        </div>
    )
}


export default Lobby;