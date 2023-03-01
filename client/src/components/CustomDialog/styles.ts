import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  dialog: {},
  container: {
    minWidth: "500px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "20px",
    padding: theme.spacing(2),
  },
  childrenBox: {},
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
    width: "100%",
    display: "flex",
    alignItems: "center",
    minWidth: "70px",
    justifyContent: "flex-end",
    gap: "10px",
    margin: 0,
  },
  buttonProgress: {
    color: "green[500]",
  },
  dialogActions: {},
}));

export default useStyles;
