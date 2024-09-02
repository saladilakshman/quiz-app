import { HashRouter, Routes, Route } from "react-router-dom";
import { Selection, Result, Quiz, Review } from "./pages/page";
import { Container } from "@mui/material";
import { Header } from "./components/component";
import { styles } from "./styles/style";
import { createContext, useReducer, useEffect } from "react";
import "./App.css";
export const QuizContext = createContext();
export default function App() {
  const quizstate = {
    selectionvalues: {
      category: "",
      name: "",
      level: "",
    },
    showinstructionsdialog: false,
    testfinishdialog: false,
    showwindowtimeoutdialog: false,
    showtesttimerdailog: false,
    quizdata: {
      isfetching: false,
      iserror: false,
      results: [],
    },
    quizactionvalues: {
      index: 0,
    },
    choices: Array(10).fill(null),
    score: 0,
  };
  const quizreducer = (state, action) => {
    switch (action.type) {
      case "quiz-selection":
        return {
          ...state,
          selectionvalues: {
            ...state.selectionvalues,
            [action.payload.name]: action.payload.value,
          },
        };
      case "show-instructions-dialog":
        return {
          ...state,
          showinstructionsdialog: !state.showinstructionsdialog,
        };
      case "next-question": {
        state.quizactionvalues.index = state?.quizactionvalues?.index + 1;
        return {
          ...state,
          index: state.quizactionvalues.index,
        };
      }

      case "previous-question": {
        state.quizactionvalues.index = state?.quizactionvalues?.index - 1;
        return {
          ...state,
          index: state.quizactionvalues.index,
        };
      }
      case "option-selection": {
        const updatedChoice = [...state.choices];
        updatedChoice[state?.quizactionvalues?.index] = action.payload.value;
        return {
          ...state,
          choices: updatedChoice,
        };
      }
      case "test-finish-dialog": {
        return {
          ...state,
          testfinishdialog: !state.testfinishdialog,
        };
      }
      case "retry-quiz": {
        return {
          ...state,
          quizactionvalues: {
            index: 0,
          },
          showwindowtimeoutdialog: false,
          showtesttimerdailog: false,
          choices: Array(10).fill(null),
          score: 0,
        };
      }
      case "score": {
        const iscorrect =
          state?.choices[action.payload] ===
          state.quizdata?.results[action.payload]?.correct_answer;
        const credit = iscorrect
          ? (state.score = state.score + 2)
          : (state.score = state.score + 0);
        console.log(credit);
        return {
          ...state,
          score: credit,
        };
      }
      case "window-test-exit": {
        return {
          ...state,
          showwindowtimeoutdialog: !state.showwindowtimeoutdialog,
        };
      }
      case "fetching": {
        return {
          ...state,
          quizdata: {
            isfetching: true,
            iserror: false,
            results: [],
          },
        };
      }
      case "sucess-data-fetch": {
        return {
          ...state,
          quizdata: {
            isfetching: false,
            iserror: false,
            results: action.payload,
          },
        };
      }
      case "error-data-fetch": {
        return {
          ...state,
          quizdata: {
            isfetching: false,
            iserror: true,
            results: [],
          },
        };
      }
      case "show-test-timer": {
        return {
          ...state,
          showtesttimerdailog: !state.showtesttimerdailog,
        };
      }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(quizreducer, quizstate, (args) => {
    const isstorageavailable = window.localStorage.getItem("quiz");
    return JSON.parse(isstorageavailable) ?? args;
  });
  useEffect(() => {
    window.localStorage.setItem("quiz", JSON.stringify(state));
  }, [state]);
  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      <Container maxWidth="md" sx={styles.container}>
        <Header />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Selection />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="/review" element={<Review />} />
          </Routes>
        </HashRouter>
      </Container>
    </QuizContext.Provider>
  );
}
