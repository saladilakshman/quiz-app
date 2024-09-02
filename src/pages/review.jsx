import {
  Box,
  Stack,
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
  Divider,
  Button,
} from "@mui/material";
import { QuizContext } from "../App";
import { useContext } from "react";
import { Smile, Frown } from "lucide-react";
import * as Colors from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
const Review = () => {
  const navigate = useNavigate();
  const {
    state: {
      quizdata: { results },
      choices,
    },
  } = useContext(QuizContext);
  return (
    <Box>
      <Button
        sx={{ mb: 3, textTransform: "capitalize" }}
        variant="outlined"
        size="medium"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <Stack direction="column" justifyContent={"center"} alignItems="baseline">
        {results.map((result, index) => {
          return (
            <Box key={index} component="div" sx={{ width: "100%", pb: 2 }}>
              <Typography variant="h6">{result.question}</Typography>
              <RadioGroup value={choices[index] || ""}>
                {[result.correct_answer, ...result.incorrect_answers].map(
                  (item, idx) => {
                    return (
                      <FormControlLabel
                        key={idx}
                        label={item}
                        control={
                          <Radio
                            value={item}
                            disableFocusRipple
                            disabled
                            disableRipple
                            disableTouchRipple
                            size="small"
                            checkedIcon={
                              choices[index] === result.correct_answer ? (
                                <Smile size={18} color={Colors.green[900]} />
                              ) : (
                                <Frown size={18} color={Colors.red[900]} />
                              )
                            }
                          />
                        }
                      />
                    );
                  }
                )}
              </RadioGroup>
              {(choices[index] !== result.correct_answer || null) && (
                <Typography
                  variant="body1"
                  sx={{ py: 0.8, color: Colors.grey[900] }}
                >
                  Correct answer : {result.correct_answer}
                </Typography>
              )}
              <Divider />
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Review;
