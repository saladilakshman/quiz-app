import { useContext, useEffect, useState, useRef } from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Typography,
  Stack,
  Box,
  Button,
} from "@mui/material";
import { Meh } from "lucide-react";
import { QuizContext } from "../App";
import ErrorIcon from "@mui/icons-material/Error";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { styles } from "../styles/style";
import {
  Testfinishdialog,
  Visibledialog,
  Testtimerdialog,
} from "../components/component";
import { useNavigate } from "react-router-dom";
const Quiz = () => {
  const {
    state: {
      quizdata: { isfetching, iserror, results },
      quizactionvalues: { index },
      choices,
    },
    dispatch,
  } = useContext(QuizContext);
  const {
    quizcomponent: { section, errorIcon, button },
    score,
  } = styles;
  const navigate = useNavigate();
  const textref = useRef();
  const handleChoiceChange = (e) => {
    dispatch({ type: "option-selection", payload: e.target });
    dispatch({ type: "score", payload: index });
  };
  const finishtest = () => {
    const isAllAttempted = choices.some((opt) => opt === null);
    isAllAttempted
      ? dispatch({ type: "test-finish-dialog", payload: score })
      : navigate("/result");
  };

  const [windowtimer, setwindowTimer] = useState(5);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        dispatch({ type: "window-test-exit" });
        textref.current.hidden = true;
        let interval = setInterval(() => {
          setwindowTimer((prevTimer) => {
            if (prevTimer <= 1) {
              clearInterval(interval);
              navigate("/result");
              return 0;
            }
            return prevTimer - 1;
          });
        }, 1000);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [dispatch, index, navigate, score]);
  const [minutes, setMinutes] = useState(7);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds === 0) {
        setSeconds(60);
        setMinutes((prevState) => prevState - 1);
        if (minutes === 0 && seconds === 0) {
          setMinutes(0);
          setSeconds(0);
          dispatch({ type: "show-test-timer" });
          setTimeout(() => {
            dispatch({ type: "show-test-timer" });
            navigate("/result");
          }, 2000);
          return;
        }
      }
      setSeconds((prevState) => prevState - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds, dispatch, navigate, index]);
  return (
    <>
      <Typography variant="h6" textAlign="center" ref={textref}>
        Time Remaining - {`0${minutes}`}:
        {seconds < 10 ? `0${seconds}` : seconds === 60 ? "00" : seconds}
      </Typography>
      <Box component="section" sx={section}>
        {isfetching && (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems={"center"}
            gap={1}
          >
            <CircularProgress />
            <Typography variant="caption">Preparing test..</Typography>
          </Stack>
        )}
        {iserror && (
          <Stack direction="column">
            <ErrorIcon sx={errorIcon} />
            <Typography variant="body2">Unexpected error!</Typography>
          </Stack>
        )}
        {Array.isArray(results) && (
          <Box sx={{ width: "100%" }}>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ pb: 3 }}
            >
              <Typography variant="body1">
                Question {index + 1} of {results.length}
              </Typography>
              <Button
                variant="text"
                size="small"
                sx={button}
                endIcon={<KeyboardArrowRightIcon />}
                onClick={finishtest}
              >
                Finish test
              </Button>
            </Stack>
            <div>
              <Typography variant="h6">{results[index]?.question}</Typography>
              <RadioGroup
                value={choices[index] || ""}
                onChange={handleChoiceChange}
              >
                {results[index]?.choices?.map((item, idx) => {
                  return (
                    <FormControlLabel
                      key={idx}
                      label={item}
                      control={
                        <Radio
                          value={item}
                          disableFocusRipple
                          disableRipple
                          disableTouchRipple
                          size="small"
                          checkedIcon={<Meh color="#2196f3" size={18} />}
                        />
                      }
                    />
                  );
                })}
              </RadioGroup>
            </div>
            <Stack
              direction="row"
              gap={2}
              sx={{ my: 1, pt: 5 }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Button
                variant="contained"
                sx={button}
                size="small"
                disabled={index === 0}
                onClick={() => {
                  dispatch({ type: "previous-question" });
                }}
              >
                Previous
              </Button>
              <Button
                size="small"
                sx={button}
                variant="outlined"
                disabled={index === results.length - 1}
                onClick={() => {
                  dispatch({ type: "next-question" });
                }}
              >
                Next
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
      <Testfinishdialog />
      <Visibledialog timer={windowtimer} />
      <Testtimerdialog timer={seconds} />
    </>
  );
};

export default Quiz;
