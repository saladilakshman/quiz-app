import { Stack, Typography, Switch } from "@mui/material";
import { styles } from "../styles/style";
const Header = () => {
  return (
    <>
      <Typography variant="h2" textAlign="center" sx={styles.appname}>
        Quizo
      </Typography>
    </>
  );
};

export default Header;
