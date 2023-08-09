function Options({ options, dispatch, answer, correct }) {
  const isAnswerd = answer !== null;
  return (
    <div className="options">
      {options.map((ques, index) => (
        <button
          key={ques}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          className={`btn btn-option ${index === answer ? `answer` : ""} ${
            isAnswerd ? (correct === index ? `correct` : "wrong") : ""
          } `}
          disabled={isAnswerd}
        >
          {ques}
        </button>
      ))}
    </div>
  );
}

export default Options;
