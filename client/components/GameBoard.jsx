import React, { useState, useEffect } from 'react';
import Square from './Square.jsx';
import Questions from './Questions.jsx';
import MainContainer from '../container/MainContainer.jsx';
import Winner from './Winner.jsx';
import Lobby from './Lobby.jsx';

function GameBoard({ displayName, socket }){

    const [view, setView] = useState(''); 
    const [question, setQuestion] = useState(''); 
    const [answer1, setAnswer1] = useState(''); 
    const [answer2, setAnswer2] = useState(''); 
    const [answer3, setAnswer3] = useState(''); 
    const [answer4, setAnswer4] = useState(''); 
    const [value, setValue] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(''); 
    const [disabled, setDisable] = useState(false);
    const [btnclass, setbtnClass] = useState('q-square');
    const [winner, setWinner] = useState('');
    const [questionsObject, setquestionObject] = useState({})
    const [score, setScore] = useState('');
    const [renderGame, setRenderGame] = useState(false); 
    const [previouslyCalledQuestions, setpreviouslyCalledQuestions] = useState([]);
    const [previouslyUsedButton, setpreviouslyUsedButton] = useState([]);
    const [playerList, setPlayerList] = useState({
      Player1: null,
      Player2: null,
      Player3: null,
      Player4: null
    });
    const [gameStart, setgameStart] = useState(false)

    // push new username to players array upon update from socket
    const [players, addPlayer] = useState([null, null, null]);

    // upon new player entry, add key value pair to scores obj
    // key is player username and value is score, initialized at 0
    const scoreObj = {
      username: 0,
    };
    scoreObj[players[0]] = 0;
    scoreObj[players[1]] = 0;
    scoreObj[players[2]] = 0;

    const [scores, setScores] = useState(scoreObj);

    const addPoints = (pts) => {
      scores[username] = scores[username] + pts;
    }

    //when someone starts the game
    socket.on("clientStart", (playerList) =>{
      console.log(playerList);
      setgameStart(true);
      setPlayerList(playerList);
    })

    //when someone picks a question
    socket.on("clientQuestionPick", (ids) =>{
      console.log()
      const sid = ids[0];
      const nid = ids[1];
      const prevQ = `${sid}${nid}`;
      console.log('prevQ');
      console.log(prevQ);
      getCurrentQuestion(sid, nid, questionsObject, prevQ);
    });

    //when receiving an answer from some other player
    socket.on("clientAnswer", (answerObj) => {
      console.log('we received answerObj')
      console.log(answerObj);
    })
    
    const handleClick = (sid, nid) => {
        // setView('q&a');
        // console.log('id: ', id);
        const prevQ = `${sid}${nid}`;
        console.log('precQ: ', prevQ);
        console.log(questionsObject)
        
        if (!previouslyCalledQuestions.includes(prevQ)) {
          socket.emit("questionPick", [sid, nid]);
          getCurrentQuestion(sid, nid, questionsObject, prevQ);
        }         
        setDisable(true);
        
    }

    const returnToBoard = () => {
        setView('Game')
    }

    const getPlayers = (e) => {
      socket.emit("start");
      e.target.style.display = "none";
    }

    //given an sid and a nid thats how we're identifying the question
    //create a state called previouslyCalledQuestions intially equal to an empty object
    //when in getCurrentQuestion we will grab the sid and nid
      //set it as a key:value pair in previouslyCalledQuestions
    
    //before we call getCurrentQuestion 
      //checkout if previouslyCalledQuestions contains a key:value pair of the passed in sid and nid
      // if true set disabled to true
    const getCurrentQuestion = (sid, nid, questionsObject, prevQ) => {
      previouslyCalledQuestions.push(prevQ)
      setpreviouslyCalledQuestions(previouslyCalledQuestions);
      previouslyUsedButton.push(prevQ);
      setpreviouslyUsedButton(previouslyUsedButton);
      for (const topicObj in questionsObject){
        if (sid === topicObj) {
          for (const numObj in questionsObject[topicObj]){
              if (nid == numObj) {
                  setValue(nid);
                  setQuestion(questionsObject[topicObj][numObj].question); 
                  setAnswer1(questionsObject[topicObj][numObj].answer1); 
                  setAnswer2(questionsObject[topicObj][numObj].answer2); 
                  setAnswer3(questionsObject[topicObj][numObj].answer3); 
                  setAnswer4(questionsObject[topicObj][numObj].answer4); 
                  setCorrectAnswer(questionsObject[topicObj][numObj].correctAnswer); 
                  setView('q&a');
              }
            }
          }
        }
      }
    //call gameFunc on intial render of component
    //change gameFunc state to true so we dont rerender
    //after calling fetch request store the object in game questions object in state
    
    //on click of button
    //set q&a state
    //look through the gameQuestions object in state and match with the one from the nid
    //store those in the existing question and answer states
    
    const gameFunc = async (sid, nid) => {
      // id.preventDefault();
      await fetch('/startGame')
      .then(response => response.json())
      .then(data => {
        setquestionObject(data);
        // setView('q&a');
        setRenderGame(true); 
          // console.log('data in gameFunc', data)            
      })
      .catch((err) => console.error('gameBoard.jsx error fetching from database :', err));
    };

    if (renderGame === false) { 
      socket.emit("enter", displayName);       
      gameFunc(); 
    }

    let topic = ['frontend', 'backend', 'systemDesign', 'databases', 'javaScript', 'gentrivia'];
    let topicTitle = ['Frontend', 'Backend', 'System Design', 'Database', 'JavaScript', 'General Trivia']
    let topicArr = [];
    topicTitle.forEach(el => {
        topicArr.push(<div className="topic-square" key={el}>{el}</div>)
    }); 

    let boardArr = [];
    let checkId;
    const money = [200, 400, 600, 800, 1000]; 
    for (let i = 0; i < topic.length; i++) {
        let qArr = [];
        let stringId = topic[i]; 
        checkId = `${stringId}`
        money.forEach(el => {
          checkId += el;
          // console.log('previouslyUsedButton')
          // console.log(previouslyUsedButton)
          if (!previouslyUsedButton.includes(checkId)) {
            
            // console.log(checkId)
            let numId = el; 
            qArr.push(<Square stringId={stringId} numId={numId} id={topic[i] + el} className={btnclass} key={el} value={el} handleClick={handleClick}></Square>)
            checkId = `${stringId}`
          }
          else {
            let numId = el; 
            qArr.push(<Square stringId={stringId} numId={numId} id={topic[i] + el} className="q-ClickedButtons" key={el} value={'XX'}  handleClick={handleClick}></Square>)
            checkId = `${stringId}`
          }
        });
        boardArr.push(<div id={topic[i]} className="column">{qArr}</div>);
    }
    if (view === 'q&a') {
      console.log('render the question!!!!!!!!!!!!!!!!!!!!!!!')
        return (
            <div>
                <div className="questionAnswer">
                    <Questions q={question} a1={answer1} a2={answer2} a3={answer3} a4={answer4} ca={correctAnswer} returnBoard={returnToBoard} socket={socket} displayName={displayName} value={value} score={score}/>
                </div>
                <div>
                    <button id="return-to-board" onClick={returnToBoard}>Return to Board</button>
                </div>
            </div>
        ) 
    } 
    else if (view === 'winner') {
        return (
            <div>
                <div><Lobby players={players} scores={scores} /></div>
                <Winner />
            </div>
        )
    }
    else {
        return (
            <div id="game-board">
                <div><Lobby players={playerList} scores={scores} gameStart={gameStart}/></div>
                <h1>JEOPARDY: GOLD+ EDITION</h1>
                
                {!gameStart  ? (<button className="topic-square" onClick={getPlayers}>Start Game</button>): (<p>Playing as {displayName}</p>)}
                
                <div className="topics">{topicArr}</div>
                <div className="q-board">{boardArr}</div>
            </div>
        )
    } 
}

export default GameBoard;


