import React, { Component } from 'react';

function MainContainer () {
    console.log("MainContainer rendering, bud.");
    return (
            <div>
                <h1>Login Here</h1>
                <div id="login">
                    <input id="username" placeholder="username"></input>
                    <input id="password" placeholder="password" type="password"></input>
                    <button id="button" >Submit</button>
                </div>
            </div>
    )
}

export default MainContainer;