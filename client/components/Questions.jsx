import React, { useState } from 'react';
import ReactDom from 'react-dom';  

// class Questions extends React.Component {
//     constructor (props) {
//         super(props); 
//         this.a1Ref = React.createRef(); 
//         this.clickAns = this.clickAns.bind(this);
//     }

//     clickAns (e) {
//         const selectedAns = Object.values(e)[0];
//         const selectedId = Object.keys(e)[0]; 
//         if( selectedAns === ca ) {
//             console.log('right answer :', selectedAns, selectedId)
//         } else {
//             // alert('wrong');
//             console.log('wrong Answer :', selectedId)
//             const element = <div className="wrong-answer">Wrong Answer</div>
//             const divA1 = this.a1Ref.current; 
//             console.log('divA1, divA1')
//         } 
//     }

//     render() {
//         return (
//             <div>
//             <div className="question-field">
//                 <div className="question-text">Question : {q}</div>
//             </div>
//             <div className="answer-field">
//                 <div ref={this.a1Ref} id={a1} onClick={() => clickAns({a1})} className="answer-text">Answer 1 : {a1}</div>
//                 <div id={a2} onClick={() => clickAns({a2})} className="answer-text">Answer 2 : {a2}</div>
//                 <div id={a3} onClick={() => clickAns({a3})} className="answer-text">Answer 3 : {a3}</div>
//                 <div id={a4} onClick={() => clickAns({a4})} className="answer-text">Answer 4 : {a4}</div>
//             </div>
//         </div>
//         )
//     }
// }


function Questions({ q, a1, a2, a3, a4, ca, returnBoard }) {
  const [response, setResponse] = useState(''); 
  const [divClass, setDivClass] = useState('answer-text'); 
    const clickAns = (e) => {
        const selectedAns = Object.values(e)[0];
        const selectedId = Object.keys(e)[0]; 
        if( selectedAns === ca ) {
            renderAnswer('right'); 
            setTimeout(returnBoard, 2000);
        } else {
            renderAnswer('wrong'); 
        } 
    }
    const renderAnswer = (className) => {
      setDivClass(className); 
      setResponse(className); 
  }

    if (response === '') 
    return (
        <div>
            <div className="question-field">
                <div className="question-text">Question : {q}</div>
            </div>
            <div className="answer-field">
                <div onClick={() => clickAns({a1})} className={divClass}>Answer 1 : {a1}</div>
                <div onClick={() => clickAns({a2})} className={divClass}>Answer 2 : {a2}</div>
                <div onClick={() => clickAns({a3})} className={divClass}>Answer 3 : {a3}</div>
                <div onClick={() => clickAns({a4})} className={divClass}>Answer 4 : {a4}</div>
            </div>
        </div>
    )
    else if (response === 'right')
    return (
        <div>
            <div className="question-field">
                <div className="question-text">Question : {q}</div>
            </div>
                <div className={divClass}> 
                    <div>CORRECT!</div>
                    <div className='right2'>Answer : "{ca}"</div>
                </div>
        </div>
    )
    else if (response === 'wrong')
    return (
        <div>
            <div className="question-field">
                <div className="question-text">Question : {q}</div>
            </div>
                <div className={divClass}> 
                    <div>WRONG!</div>
                    <div className='wrong2'>Correct Answer : "{ca}"</div>
                </div>
        </div>
    )
}


export default Questions;