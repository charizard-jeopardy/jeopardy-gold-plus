import React from 'react';
import LogIn from '../components/Login.jsx'
import Lobby from '../components/Lobby.jsx'
import GameContainer from './GameContainer.jsx'




function MainContainer ({ Login }) {
    return (
            <div>
                <LogIn Login={ Login }/>
            </div>
    )
}

export default MainContainer;