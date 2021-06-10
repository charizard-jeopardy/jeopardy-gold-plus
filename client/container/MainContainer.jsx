import React, { useState, useEffect } from 'react';
import cookie from 'react-cookie';
import LogIn from '../components/Login.jsx'
import SignUp from '../components/SignUp.jsx'
import GameBoard from "../components/GameBoard.jsx";
import { io } from 'socket.io-client';

let socket;
if (process.env.NODE_ENV === 'development') socket = io();
else socket = io('http://54.80.185.106/');



function MainContainer () {
    const [viewState, setViewState] = useState('');

    fetch('/checkSession', {
        method: 'GET',
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          const session = json.loggedIn;
          if (session===true) setViewState('Game');
          console.log('json object before valid')
          console.log(json)
          setUsername(json.username);
        }).catch((err) => {
          console.log(err);
        });
    
    const [username, setUsername] = useState(''); 


    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    // const [gameName, setGameName] = useState('')
    // const [displayName, setDisplayName] = useState('');

    const un = async (e) => {
      console.log('in the unseranme func')
      console.log(e.target.value)
        await setUsername(e.target.value);
        console.log('setState un: ' + username)
    }
    const pw = (e) => {
        setPassword(e.target.value);
    }
    const em = (e) => {
        setEmail(e.target.value);
        console.log('email:')
        console.log(email)
    }
    const nn = (e) => {
      console.log('display name in func nn')
      // console.log(e)
      // setGameName(e.target.value);
        // console.log(gameName);
    }
    const signupBtnFunc = async () => {
        await setViewState('signup'); 
    }
    const renderGame = async () => {
        await setViewState('Game'); 

    }

    const signupFunc = async (e) => {
      console.log('displayName before the post request')
      // console.log(gameName)
          e.preventDefault();
          const body = {
          username: username,
          password: password,
          email: email,
          displayName: username,
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
          console.log('In the login func');
          console.log('username is' + username);
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
                setViewState('signup');
            } 
        })
        .catch((err) => console.log('error fetching from database :', err));
      };

    if (viewState === 'signup') return(
        <div> <SignUp un={un} pw={pw} em={em} nn={nn} signupFunc={signupFunc} /> </div>
    )
    else if (viewState === '' || viewState === 'login') return (
      <div >
        <div> <LogIn un={un} pw={pw} loginFunc={loginFunc} signupBtnFunc={signupBtnFunc}/> </div>
      </div>
    )
    else if (viewState === 'Game') {
      console.log('username before rendering gameboard');
      console.log(username)
      return (
        <div>

          <div id="game-container"><GameBoard displayName={username} socket={socket}/></div>

        </div>
    )}
}


export default MainContainer;
