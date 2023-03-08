import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  dialog: {},
  container: {
    minWidth: "500px",
    margin: theme.spacing(0, "auto"),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: theme.spacing(3),
    padding: theme.spacing(2),
  },
  childrenBox: {},
  button: {
    borderRadius: theme.shape.borderRadius,
    textTransform: "none",
    fontSize: "14px",
    padding: theme.spacing(0.5, 2),
    boxShadow: "none",
    color: theme.palette.common.white,
    "&:hover": {
      boxShadow: "none",
      backgroundColor: theme.palette.primary.light,
    },
  },
  cancelButton: {
    borderRadius: "8px",
    textTransform: "none",
    fontSize: "14px",
    padding: theme.spacing(0.5, 2),
    backgroundColor: theme.palette.background.paper,
    border: `0.5px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    boxShadow: "none",
    "&:hover": {
      boxShadow: `inset 0 0 0 0.5px ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.background.paper,
    },
  },
  buttonError: {
    borderRadius: "8px",
    textTransform: "none",
    fontSize: "14px",
    padding: theme.spacing(0.5, 2),
    boxShadow: "none",
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      boxShadow: "none",
      backgroundColor: theme.palette.error.dark,
    },
  },
  buttonWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    minWidth: "70px",
    justifyContent: "flex-end",
    gap: theme.spacing(2),
    margin: theme.spacing(0),
  },
  buttonProgress: {
    color: theme.palette.primary.main,
  },
  dialogActions: {},
}));

export default useStyles;
