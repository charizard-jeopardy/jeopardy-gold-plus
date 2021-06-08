import React, { useState, useEffect } from 'react';

function LogIn () {
    // const { setUsername } = props;
    // const { setPassword } = props;
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 

    const un = (e) => {
        console.log('onSubmit : ', e.target.value)
        setUsername(e.target.value);
    }

    const pw = (e) => {
        console.log('onSubmit : ', e.target.value)
        setPassword(e.target.value);
    }

    const su = (e) => {
        
    }
    
    const loginFunc = async () => {
          const body = {
          username: username,
          password: password
          };
          console.log(body);
          const data = await fetch('/signup', {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          credentials: "same-origin",
        })
        return data.json()
        .catch((err) => console.err('error fetching from database :', err));
      };

    const signupFunc = async () => {
        const body = {
            username: username,
            password: password
            };
            console.log(body);
            const data = await fetch('/signup', {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            credentials: "same-origin",
          })
          return data.json()
          .catch((err) => console.err('error fetching from database :', err));
        };
    }

    return (
            <div >
                <h1 >Login Here</h1>
                <div id="login-field">
                    <form onSubmit={loginFunc}>
                        <input id="username" placeholder="username" color="primary" onChange={un} ></input>
                        <input id="password" type="text" placeholder="password" onChange={pw} ></input>
                        <button id="login-button" type="submit">Sign In</button>
                        <button id="signup-button" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
    )
}




export default LogIn;