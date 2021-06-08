import React, { useState, useEffect } from 'react';
import LogIn from '../components/Login.jsx'
import SignUp from '../components/SignUp.jsx'
import Lobby from '../components/Lobby.jsx'
import GameContainer from './GameContainer.jsx'



function MainContainer () {
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [viewState, setViewState] = useState('');
    const [email, setEmail] = useState(''); 
    const [nickname, setNickname] = useState('');

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
        setNickname(e.target.value);
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
          nickname: nickname,
          highScore: 0
          };
          console.log("signup.jsx body : ", body);

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
          console.log(body);
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
            if (data) renderGame(); 
        })
        .catch((err) => console.log('error fetching from database :', err));
      };

    if (viewState === 'signup') return(
        <div> <SignUp un={un} pw={pw} em={em} nn={nn} signupFunc={signupFunc}/> </div>
    )
    else if (viewState === '' || viewState === 'login') return (
        <div> <LogIn un={un} pw={pw} loginFunc={loginFunc} signupBtnFunc={signupBtnFunc}/> </div>
    )
    else if (viewState === 'Game') return (
        <div>
            <div><Lobby /></div>
            <div><GameContainer /></div>
        </div>
    )
}

export default MainContainer;