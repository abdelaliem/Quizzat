function NextButton({ dispatch, answer, numOfQuestions, index, points }) {
  if (answer === null) return null;
  if (index === numOfQuestions - 1) {
    return (
      <button
        onClick={() => dispatch({ type: "finshed" })}
        className="btn btn-ui"
      >
        finish
      </button>
    );
  }
  if (index < numOfQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ type: "newQuestion" })}
        className="btn btn-ui"
      >
        Next
      </button>
    );
}

export default NextButton;
