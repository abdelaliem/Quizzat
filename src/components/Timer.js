import { useEffect } from "react";

function Timer({ dispatch, remainingSeconds }) {
    const minutes= Math.floor(remainingSeconds/60)
    const seconds = remainingSeconds%60
  return (
    <div className="timer">
      {useEffect(
        function () {
          const id = setInterval(function () {
            dispatch({ type: "tick" });
          }, 1000);
          return ()=>clearInterval(id);
        },
        [dispatch]
      )}
      {minutes<10 ? 0:''}{minutes}:{seconds<10 ? 0 :''}{seconds}
    </div>
  );
}

export default Timer;
