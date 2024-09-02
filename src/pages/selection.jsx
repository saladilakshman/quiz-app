import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Categories, Levels } from "../helpers/data";
import { styles } from "../styles/style";
import { useContext } from "react";
import { QuizContext } from "../App";
import { Instructiondialog } from "../components/component";
const Selection = () => {
  const {
    selection: { section },
  } = styles;
  const {
    state: {
      selectionvalues: { name, category, level },
    },
    dispatch,
  } = useContext(QuizContext);
  const InputSelection = (event) => {
    const { name, value } = event.target;
    dispatch({ type: "quiz-selection", payload: { name, value } });
  };
  return (
    <>
      <Box component="section" sx={section}>
        <TextField
          type="text"
          fullWidth
          label="name"
          name="name"
          value={name}
          onChange={(e) => InputSelection(e)}
        />
        <TextField
          select
          type="text"
          label="choose category.."
          fullWidth
          name="category"
          value={category}
          onChange={(e) => InputSelection(e)}
          SelectProps={{
            MenuProps: {
              style: {
                height: 500,
              },
            },
          }}
        >
          {Categories.map((category, index) => {
            return (
              <MenuItem key={index} value={category?.category}>
                {category?.category}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          select
          type="text"
          name="level"
          label="choose difficulty type.."
          fullWidth
          onChange={(e) => InputSelection(e)}
          value={level}
          SelectProps={{
            MenuProps: {
              style: {
                height: 500,
              },
            },
          }}
        >
          {Levels.map((level, index) => {
            return (
              <MenuItem key={index} value={level}>
                {level}
              </MenuItem>
            );
          })}
        </TextField>
        <Button
          variant="contained"
          sx={{ textTransform: "Capitalize" }}
          fullWidth
          aria-hidden={false}
          disabled={
            name === "" || category === "" || level === "" ? true : false
          }
          onClick={() => dispatch({ type: "show-instructions-dialog" })}
        >
          Start Quiz
        </Button>
      </Box>
      <Instructiondialog />
    </>
  );
};

export default Selection;
