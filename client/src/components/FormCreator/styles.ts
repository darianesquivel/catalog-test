import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: "500px",
    display: "flex",
    margin: theme.spacing(0, "auto"),
    padding: theme.spacing(3),
    flexFlow: "column",
    gap: "20px",
  },
  createButton: {
    borderRadius: "8px",
    textTransform: "none",
    fontSize: "14px",
    padding: theme.spacing(0.5, 2),
    boxShadow: "none",
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
  buttonWrapper: {
    minWidth: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  buttonProgress: {
    color: theme.palette.grey[500],
  },
  snackBar: {
    "& .MuiSnackbarContent-root": {
      padding: "0px",
    },
    "& .MuiSnackbarContent-message": {
      padding: "0px",
      width: "100%",
    },
  },
}));

export default useStyles;
