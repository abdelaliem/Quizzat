import Options from "./Options"
function Question({question,dispatch,answer}) {
    console.log(question)
    return (
        <div>
           <h4>{question.question} </h4>
           <Options options={question.options} dispatch={dispatch} answer={answer} correct={question.correctOption}/>
           
        </div>
    )
}

export default Question
