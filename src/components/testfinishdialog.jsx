import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  DialogActions,
} from "@mui/material";
import { useContext } from "react";
import { QuizContext } from "../App";
import { useNavigate } from "react-router-dom";
const Testfinishdialog = () => {
  const {
    state: {
      selectionvalues: { name },
      testfinishdialog,
      index,
    },
    dispatch,
  } = useContext(QuizContext);
  const navigate = useNavigate();
  return (
    <Dialog
      open={testfinishdialog}
      onClose={() => dispatch({ type: "test-finish-dialog" })}
    >
      <DialogContent>
        <Typography
          variant="body2"
          sx={{
            fontSize: { lg: 17, md: 15, sm: 12 },
          }}
        >
          Hello {name}, you did not attempted all the questions. Are you sure
          you want to finish the test now.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          size="small"
          sx={{ textTransform: "capitalize" }}
          onClick={() => {
            dispatch({ type: "test-finish-dialog" });
            navigate("/result");
          }}
        >
          Yes
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{ textTransform: "capitalize" }}
          onClick={() => {
            dispatch({ type: "test-finish-dialog" });
          }}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Testfinishdialog;
