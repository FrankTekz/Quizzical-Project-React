import React, { useState, useEffect } from 'react';
import Homepage from './Homepage';
import Question from './Quiz';



function App() {
const [quizData, setData] = useState([])
const [quizGoing, setGoing] = useState(false)
const [quizStart, setStart] = useState(false)

//shuffle function that shuffles arounf array elements
function shuffle(array){
  for(let i = 0; i < array.length; i++){
  let item = array[i]
  const randomNum = Math.floor(Math.random()* array.length)
  array[i] = array[randomNum]
  array[randomNum] = item
  return array
}
}
//function decodes API data (data is returned with weird characters)
function decodeHtml(html) {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

//API data is fetched, decoded and shuffled. It is then set to quizData state
useEffect(()=> {
  fetch('https://opentdb.com/api.php?amount=5&type=multiple')
  .then(res=> res.json())
  .then(data=>{
    setData(data.results.map(question =>{
      return {
        question: decodeHtml(question.question),
        incorrectAnswers: question.incorrect_answers.map((ans)=>decodeHtml(ans)),
        correctAnswer: decodeHtml(question.correct_answer),
        finalAnswers:shuffle([question.correct_answer, ...question.incorrect_answers]).map((ans)=>decodeHtml(ans)),
      }
    }))
  })
}, [])

//quiz question components are created using the .map method. Data from API is passed along as props
const quizElements = quizData.map(quizComp => {
    return(
      <Question
       key={quizComp.question}
       question={quizComp.question} 
       correctAnswer={quizComp.correctAnswer} 
       finalAnswers={quizComp.finalAnswers}
       quizGoing={quizGoing}
       />
      )
})

//seperate variable for quiz component is created to make rendering smoother
const quiz = (
  <div>
    {quizElements}
  </div>
);
//this function sets state of the homepage button in order to start the quiz
function startQuiz(){
  setStart(prevState => !prevState);
  setGoing(prevState => !prevState);
}

function endQuiz(){
  setGoing(prevState => !prevState);
}

function restartQuiz(){
  window.location.reload();
}

  return (
    <div className='container'>
      {quizStart === true ? quiz : <Homepage startQuiz={startQuiz}/>}

      {quizStart === true && quizGoing === true ? <button className='final-btn' onClick={endQuiz}>Check answers</button> : null}

      {quizStart === true && quizGoing === false  ? <button className='final-btn' onClick={restartQuiz}>Restart Quiz</button> : null}
         
    </div>
    
  );
}

export default App;


