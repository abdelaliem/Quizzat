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


const data3 =  [
  {
    "question": "Which is the most popular JavaScript framework?",
    "options": ["Angular", "React", "Svelte", "Vue"],
    "correctOption": 1,
    "points": 10
  },
  {
    "question": "Which company invented React?",
    "options": ["Google", "Apple", "Netflix", "Facebook"],
    "correctOption": 3,
    "points": 10
  },
  {
    "question": "What's the fundamental building block of React apps?",
    "options": ["Components", "Blocks", "Elements", "Effects"],
    "correctOption": 0,
    "points": 10
  },
  {
    "question": "What's the name of the syntax we use to describe the UI in React components?",
    "options": ["FBJ", "Babel", "JSX", "ES2015"],
    "correctOption": 2,
    "points": 10
  },
  {
    "question": "How does data flow naturally in React apps?",
    "options": [
      "From parents to children",
      "From children to parents",
      "Both ways",
      "The developers decides"
    ],
    "correctOption": 0,
    "points": 10
  },
  {
    "question": "How to pass data into a child component?",
    "options": ["State", "Props", "PropTypes", "Parameters"],
    "correctOption": 1,
    "points": 10
  },
  {
    "question": "When to use derived state?",
    "options": [
      "Whenever the state should not trigger a re-render",
      "Whenever the state can be synchronized with an effect",
      "Whenever the state should be accessible to all components",
      "Whenever the state can be computed from another state variable"
    ],
    "correctOption": 3,
    "points": 30
  },
  {
    "question": "What triggers a UI re-render in React?",
    "options": [
      "Running an effect",
      "Passing props",
      "Updating state",
      "Adding event listeners to DOM elements"
    ],
    "correctOption": 2,
    "points": 20
  },
  {
    "question": "When do we directly \"touch\" the DOM in React?",
    "options": [
      "When we need to listen to an event",
      "When we need to change the UI",
      "When we need to add styles",
      "Almost never"
    ],
    "correctOption": 3,
    "points": 20
  },
  {
    "question": "In what situation do we use a callback to update state?",
    "options": [
      "When updating the state will be slow",
      "When the updated state is very data-intensive",
      "When the state update should happen faster",
      "When the new state depends on the previous state"
    ],
    "correctOption": 3,
    "points": 30
  },
  {
    "question": "If we pass a function to useState, when will that function be called?",
    "options": [
      "On each re-render",
      "Each time we update the state",
      "Only on the initial render",
      "The first time we update the state"
    ],
    "correctOption": 2,
    "points": 30
  },
  {
    "question": "Which hook to use for an API request on the component's initial render?",
    "options": ["useState", "useEffect", "useRef", "useReducer"],
    "correctOption": 1,
    "points": 10
  },
  {
    "question": "Which variables should go into the useEffect dependency array?",
    "options": [
      "Usually none",
      "All our state variables",
      "All state and props referenced in the effect",
      "All variables needed for clean up"
    ],
    "correctOption": 2,
    "points": 30
  },
  {
    "question": "An effect will always run on the initial render.",
    "options": [
      "True",
      "It depends on the dependency array",
      "False",
      "In depends on the code in the effect"
    ],
    "correctOption": 0,
    "points": 30
  },
  {
    "question": "When will an effect run if it doesn't have a dependency array?",
    "options": [
      "Only when the component mounts",
      "Only when the component unmounts",
      "The first time the component re-renders",
      "Each time the component is re-rendered"
    ],
    "correctOption": 3,
    "points": 20
  }
]






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
    const data = data3
       dispatch({ type: "dataRecieved", payload: data })
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
