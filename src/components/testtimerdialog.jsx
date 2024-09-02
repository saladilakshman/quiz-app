/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Dialog,
  DialogContent,
  Typography,
  Stack,
  Box,
  Divider,
} from "@mui/material";
import { useContext } from "react";
import { QuizContext } from "../App";
import WarningIcon from "@mui/icons-material/Warning";
import * as Colors from "@mui/material/colors";
const Testtimerdialog = ({ timer }) => {
  const {
    state: { showtesttimerdialog },
  } = useContext(QuizContext);
  return (
    <Dialog
      open={timer === 0 ? !showtesttimerdialog : showtesttimerdialog}
      disableEscapeKeyDown
    >
      <DialogContent>
        <Typography variant="h6">Time is out. closing window </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default Testtimerdialog;
