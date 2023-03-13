import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "calc(100vh - 145px)",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr",
  },
}));

export default useStyles;
