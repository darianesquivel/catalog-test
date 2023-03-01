import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  dialog: {
    position: "relative",
  },
  container: {
    minWidth: "500px",
    margin: "0 auto",
    padding: "30px",
    display: "flex",
    flexFlow: "column",
    gap: "20px",
  },
  button: {
    width: "40px",
    alignSelf: "flex-end",
    objectFit: "contain",
  },
  cancelButton: {
    color: "rgb(43, 153, 216)",
    background: "rgba(43, 153, 216, 0.2)",
  },
  buttonWrapper: {
    display: "flex",
    alignItems: "center",
    minWidth: "70px",
    justifyContent: "center",
    position: "relative",
  },
  buttonProgress: {
    color: "green[500]",
  },
}));

export default useStyles;
