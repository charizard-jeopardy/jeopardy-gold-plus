import React from 'react';


function Square({ stringId, numId, id, value, handleClick }){


    return(
        <div>
            <button className="gametile" id={id} onClick={() => handleClick(stringId, numId)}>{value}</button>
        </div>
    )
}

export default Square;