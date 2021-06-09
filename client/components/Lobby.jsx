import React from 'react';

function Lobby() {
    return(
        <div id="lobby-bar">
            <div id="lobby-players">
                <h3 className="lobby-el">Player 1</h3>
                <h3 className="lobby-el">Player 2</h3>
                <h3 className="lobby-el">Player 3</h3>
                <h3 className="lobby-el">Player 4</h3>
            </div>
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