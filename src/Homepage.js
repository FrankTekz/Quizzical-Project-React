import React from 'react'

export default function Homepage(props){
    return(
        <div className="home">
            <h1 id='title'>Quizzical</h1>
            <h4>Are you ready to test your knowledge?</h4>
            <button className='start-quiz' onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}