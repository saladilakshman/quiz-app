import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
  DialogActions,
} from "@mui/material";
import { useContext } from "react";
import { QuizContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Categories } from "../helpers/data";
const Instructiondialog = () => {
  const instructions = [
    `A total of <strong>10</strong> questions will be had. No negative marking is there.`,
    "You can finish the test at any moment, without answering all the questions.",
    `Exiting the current window, will mark the test as finished, and you can't resume the test.`,
    `Total time for the test is <strong>7 minutes</strong>.`,
    `using emojis as the indicators of the options you selected as below<br/>
    🙁 - Incorrect answer<br/>
    😃 - Correct answer<br/>
    😐 - Selected option`,
  ];
  const {
    state: {
      showinstructionsdialog,
      selectionvalues: { level, category },
    },
    dispatch,
  } = useContext(QuizContext);
  const navigate = useNavigate();
  const startQuiz = () => {
    dispatch({ type: "show-instructions-dialog" });
    navigate("/quiz");
    const categoryvalue = Categories.find((ctr) => ctr.category === category);
    axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=${
          categoryvalue?.value
        }&difficulty=${level.toLowerCase()}&type=multiple`
      )
      .then((res) => {
        const args = res?.data?.results?.map((q) => ({
          ...q,
          choices: [q.correct_answer, ...q.incorrect_answers].sort(() => {
            return Math.random() - 0.5;
          }),
        }));
        dispatch({ type: "sucess-data-fetch", payload: args });
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <Dialog
      open={showinstructionsdialog}
      onClose={() => dispatch({ type: "show-instructions-dialog" })}
    >
      <DialogContent>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{ borderBottom: 1, borderColor: "divider", fontWeight: "bold" }}
        >
          Instructions
        </Typography>
        <Box
          component="ul"
          sx={{
            listStyleType: "circle",
          }}
        >
          {Array.from(instructions, (instruction, index) => {
            return (
              <Box component="li" key={index} sx={{ py: 0.3 }}>
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{ __html: instruction }}
                />
              </Box>
            );
          })}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={startQuiz}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Instructiondialog;
