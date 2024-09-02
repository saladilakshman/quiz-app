import * as Colors from "@mui/material/colors";
export const styles = {
  container: {
    px: 2,
    py: 1,
    zIndex: 1,
    background: Colors.common.white,
    border: 1,
    borderColor: "divider",
    borderRadius: 2,
  },
  appname: {
    fontSize: { xs: 30, md: 40, lg: 50 },
    background: "linear-gradient(#e66465, #9198e5);",
    backgroundClip: "text",
    color: "transparent",
    pb: 2,
  },
  selection: {
    section: {
      py: 1,
      display: "flex",
      flexDirection: "column",
      gap: 5,
      my: 8,
    },
  },
  quizcomponent: {
    section: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      my: 2,
    },
    errorIcon: {
      color: Colors.deepOrange[600],
      fontSize: { sm: 43, lg: 53 },
    },
    button: {
      textTransform: "capitalize",
      my: 3,
    },
  },
};
