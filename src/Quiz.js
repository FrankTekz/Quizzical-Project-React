
import React ,{useState} from 'react'

export default function Question(props){
  const [select, setSelect] = useState('')

   //this functions sets selectState to the answer option being selected
   function selectAnswer(option){
    setSelect(option)
  }

// function defines the which class is needed for each specific element
const defineClass= (option) => {
  if (props.quizGoing === true){ // if quiz is active
    return(select === option ? 'selected' : null) // then if clicked, option becomes blue
  } else if (props.quizGoing === false){ // if quiz is not active aka checking answers
    if(option === props.correctAnswer){ 
      return 'correct'; // correct answer always green
    } else if(select === option) {
      return 'wrong' // if selected wrong answer, then red
     } else if(select !== option && option !== props.correct) return null //if wrong but not slected, null
  }
}

//elements for answers being created here
  const options = [...props.finalAnswers].map((option)=> {
    return(
    <p 
      onClick={props.quizGoing === true ? () => selectAnswer(option) : 'null'} 
      className={defineClass(option)}>
      {option}
    </p>
    )
    });
    
    return(
        <div className='quiz-questions'>
            <h2>{props.question}</h2>
            <div className='quiz-answers'>
                {options}
            </div>
        </div>
    )
}
