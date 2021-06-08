import React from 'react';


function Square(){

    const handleClick = () => {
        alert("clicked button");
    }

    return(
        <div>
            <button id="gametile" onClick={handleClick}>$200</button>
        </div>
    )
}

export default Square;