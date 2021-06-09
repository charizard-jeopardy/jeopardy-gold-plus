import React from 'react';


function Square({ id, value, handleClick }){


    return(
        <div>
            <button className="gametile" id={id} onClick={() => handleClick(id)}>{value}</button>
        </div>
    )
}

export default Square;