import { Typography, Box, Stack, Button, Divider } from "@mui/material";
import { QuizContext } from "../App";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { styles } from "../styles/style";
import { useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import "../App.css";
function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const navref = useRef();
  useEffect(() => {
    if (location.pathname.includes("result")) {
      navref.current.hidden = false;
    } else {
      navref.current.hidden = true;
    }
    setTimeout(() => {
      navref.current.hidden = true;
    }, 7000);
  });
  const {
    state: {
      choices,
      score,
      selectionvalues: { name },
    },
    dispatch,
  } = useContext(QuizContext);
  const attemptedquestions = 10 - choices.filter((el) => el === null).length;
  const scorecard = [
    {
      text: "Total questions",
      value: 10,
    },
    {
      text: "Attempted questions",
      value: attemptedquestions,
    },
    {
      text: "correct-questions",
      value: score / 2,
    },
  ];

  return (
    <Box component="section">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        ref={navref}
      />

      <Button
        variant="text"
        size="small"
        sx={styles.quizcomponent.button}
        startIcon={<ArrowBackIosIcon fontSize="small" />}
        onClick={() => navigate("/")}
      >
        back to homepage
      </Button>
      <Typography
        variant="h6"
        textAlign="center"
        sx={{
          // fontSize: { xs: 15 },
          py: 2,
        }}
      >
        Congrats <strong>{name}</strong>, your scorecard is here.
      </Typography>
      <Box
        component="div"
        sx={{
          shadow: 4,
          width: { xs: "90%", lg: "50%" },
          display: "block",
          mx: "auto",
          pt: 1,
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
          px: 1,
        }}
      >
        {scorecard.map((card, index) => {
          return (
            <Box key={index} sx={{ py: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {card.text} :<Box component="span">{card.value}</Box>
              </Typography>
            </Box>
          );
        })}
        <Divider />
        <Typography
          variant="body1"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 0.8,
          }}
        >
          Total score:<Box component="span">{score}</Box>
        </Typography>
      </Box>
      <Stack
        direction="row"
        justifyContent={"center"}
        alignItems={"cener"}
        gap={2}
        sx={{ my: 2 }}
      >
        <Button
          variant="contained"
          size="small"
          sx={styles.quizcomponent.button}
          onClick={() => navigate("/review")}
        >
          review answers
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={styles.quizcomponent.button}
          onClick={() => {
            dispatch({ type: "retry-quiz" });
            navigate("/quiz");
          }}
        >
          Retry test
        </Button>
      </Stack>
    </Box>
  );
}

export default Result;
