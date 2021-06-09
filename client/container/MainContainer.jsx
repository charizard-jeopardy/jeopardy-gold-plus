import React, { useState, useEffect } from 'react';
import cookie from 'react-cookie';
import LogIn from '../components/Login.jsx'
import SignUp from '../components/SignUp.jsx'
import Lobby from '../components/Lobby.jsx'
import GameBoard from "../components/GameBoard.jsx";


function MainContainer () {
    const [viewState, setViewState] = useState('');

    fetch('/checkSession', {
        method: 'GET',
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((json) => {
          const session = json.loggedIn;
          if (session===true) setViewState('Game');
          setDisplayName(json.displayName);
        }).catch((err) => {
          console.log(err);
        });
    
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(''); 
    const [displayName, setDisplayName] = useState('');

    const un = (e) => {
        setUsername(e.target.value);
    }
    const pw = (e) => {
        setPassword(e.target.value);
    }
    const em = (e) => {
        setEmail(e.target.value);
    }
    const nn = (e) => {
        setDisplayName(e.target.value);
    }
    const signupBtnFunc = async () => {
        await setViewState('signup'); 
    }
    const renderGame = async () => {
        await setViewState('Game'); 
    }

    const signupFunc = async (e) => {
          e.preventDefault();
          const body = {
          username: username,
          password: password,
          email: email,
          displayName: displayName,
          highScore: 0
          };
          fetch('/signup', {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          credentials: "same-origin",
        })
        .then(response => response.json())
        .then(data => {
            console.log('post-signup response from server : ', data); 
            if (data) renderGame();
        })
        .catch((err) => console.err('error fetching from database :', err));
      };

    const loginFunc = async (e) => {
          e.preventDefault();
          const body = {
          username: username,
          password: password
          };
          fetch('/login', {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          credentials: "same-origin",
        })
        .then(response => response.json())
        .then(data => {
            console.log('user logged in :', data);  
            if (data.loggedIn === true) renderGame(); 
            else {
                setViewState('signUp');
            } 
        })
        .catch((err) => console.log('error fetching from database :', err));
      };

    // useEffect(() =>{

    // }, [])



    if (viewState === 'signup') return(
        <div> <SignUp un={un} pw={pw} em={em} nn={nn} signupFunc={signupFunc}/> </div>
    )
    else if (viewState === '' || viewState === 'login') return (
        <div> <LogIn un={un} pw={pw} loginFunc={loginFunc} signupBtnFunc={signupBtnFunc}/> </div>
    )
    else if (viewState === 'Game') return (
        <div>
            <div><Lobby /></div>
            <div id="game-container"><GameBoard displayName={displayName}/></div>
        </div>
    )
}


export default MainContainer;