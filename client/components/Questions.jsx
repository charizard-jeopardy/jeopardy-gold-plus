import React from 'react';

function Questions({ q, a1, a2, a3, a4, ca}) {
    return (
        <div>
            <div className="question-field">
                <div>Question : {q}</div>
            </div>
            <div className="answer-field">
                <div>Answer 1 : {a1}</div>
                <div>Answer 2 : {a2}</div>
                <div>Answer 3 : {a3}</div>
                <div>Answer 4 : {a4}</div>
            </div>
        </div>
    )
}


export default Questions;