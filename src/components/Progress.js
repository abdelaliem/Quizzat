function Progress({questions,index,points,answer}) {
    return (
        <div>
           <progress max={questions.length} value={index+Number(answer!==null)}></progress>
          <div className="progress">
            <p>Question <strong>{index+1}</strong>/{questions.length}</p>
            <p>Points {points}/280</p>
          </div> 
        </div>
    )
}

export default Progress
