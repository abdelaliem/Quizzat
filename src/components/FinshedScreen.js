function FinshedScreen({ points,dispatch }) {
  const percentage = (points / 280) * 100;
  return (
    <>
      <p className="result">
        you scored <strong>{points}</strong> out of 280 {Math.ceil(percentage)}%
      </p>
      <button
        onClick={() => dispatch({ type: "restart" })}
        className="btn btn-ui"
      >
        restart
      </button>
    </>
  );
}

export default FinshedScreen;
