import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function LogIn () {
    return (
            <div >
                <h1 >Login Here</h1>
                <div id="login-field">
                    <div className="login">
                        <TextField id="outlined-basic" variant="outlined" placeholder="username" color="primary"></TextField>
                    </div>
                    <div className="login">
                        <TextField id="outlined-basic" variant="outlined" placeholder="password" type="password" color="primary"></TextField>
                    </div>
                    <div>
                        <Button id="login-button" color="primary" >Submit</Button>
                    </div>
                </div>
            </div>
    )
}

export default LogIn;