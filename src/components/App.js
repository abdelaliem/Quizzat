import Main from "./Main";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinshedScreen from "./FinshedScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useReducer } from "react";
import { useEffect } from "react";
const intialState = {
  questions: [],
  statues: "loading",
  index: 0,
  answer: null,
  points: 0,
  remainingSeconds: null,
};
function reducer(state, action) {
  const question = state.questions[state.index];
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, statues: "dataRecieved" };

    case "dataError":
      return { ...state, statues: "dataError" };

    case "start":
      return { ...state, statues: "ready",remainingSeconds: state.questions.length * 30 };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "newQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finshed":
      return { ...state, statues: "finshed" };
    case "restart":
      return {
        ...intialState,
        statues: "ready",
        questions: state.questions,
      };
    case "tick":
      return {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        statues: state.remainingSeconds === 0 ? "finshed" : state.statues,
      };
    default:
      throw new Error("action unknown");
  }
}
function App() {
  const [{ questions, statues, index, answer, points,remainingSeconds }, dispatch] = useReducer(
    reducer,
    intialState
  );
  let numOfQuestions = questions.length;
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch(() => dispatch({ type: "dataError" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {statues === "loading" && <Loader />}
        {statues === "dataError" && <Error />}
        {statues === "dataRecieved" && (
          <Start numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {statues === "ready" && (
          <>
            <Progress
              questions={questions}
              index={index}
              points={points}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} remainingSeconds={remainingSeconds}/>
            </Footer>
            <NextButton
              dispatch={dispatch}
              index={index}
              numOfQuestions={numOfQuestions}
              answer={answer}
              points={points}
            />
          </>
        )}
        {statues === "finshed" && (
          <FinshedScreen dispatch={dispatch} points={points} />
        )}
      </Main>
    </div>
  );
}
export default App;
