function Start({numOfQuestions,dispatch}) {
    return (
        <div className="start">
        <h2>
           Welcome to The react Quiz!
        </h2>
        <h3>{numOfQuestions} questions to test your React mystery</h3>
        <button className="btn" onClick={()=>dispatch({type:'start'})}>Start</button>
        </div> 
    )
}

export default Start
