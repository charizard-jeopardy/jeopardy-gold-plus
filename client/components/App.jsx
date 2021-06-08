import React, { useState, useEffect } from 'react';
import MainContainer from '../container/MainContainer.jsx'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import blue from '@material-ui/core/colors/blue';
import yellow from '@material-ui/core/colors/yellow';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: yellow[500],
    },
  },
});


function App () {


    return (
        <div> 
            <ThemeProvider theme={theme}>
                <MainContainer />
            </ThemeProvider> 
        </div>
    )
}




export default App;