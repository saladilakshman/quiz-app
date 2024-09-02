/* eslint-disable react/prop-types */
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
const Visibledialog = ({ timer }) => {
  const {
    state: { showwindowtimeoutdialog },
  } = useContext(QuizContext);
  return (
    <Dialog
      open={timer === 0 ? !showwindowtimeoutdialog : showwindowtimeoutdialog}
      disableEscapeKeyDown
    >
      <DialogContent>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={4}
        >
          <Box sx={{ width: "100%" }}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              <WarningIcon sx={{ color: Colors.red["A700"], fontSize: 18 }} />
              <Typography
                variant="h6"
                textAlign="center"
                sx={{ color: Colors.red["A700"] }}
              >
                Warning
              </Typography>
            </Stack>
            <Divider />
          </Box>
          <Typography variant="body1">
            you exited the window during test. Finishing test in{" "}
            <em>{timer}s</em>
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Visibledialog;
