import React, { useState, useEffect } from 'react';

function SignUp (props) {
    const { un, pw, em, nn, signupFunc } = props; 

    return (
            <div >
                <h1 >Sign Up Here</h1>
                <div id="signup-field">
                    <form onSubmit={signupFunc}>
                        <input id="inputField" className="signupField" placeholder="username" color="primary" onChange={un} ></input>
                        <input id="inputField" className="signupField" type="text" placeholder="password" onChange={pw} ></input>
                        <input id="inputField" className="signupField" type="text" placeholder="email" onChange={em} ></input>
                        <input id="inputField" className="signupField" type="text" placeholder="what should we call you?" onChange={nn} ></input>
                        <button id="splash-button" className="signupField" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
    )
}




export default SignUp;