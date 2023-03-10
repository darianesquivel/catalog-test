import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    height: `calc(100vh - 100px)`,
  },
  table: {
    height: "100%",
  },
  tableHead: {
    height: "8%",
  },
  tableBody: {
    height: "90%",
  },
  tableFooter: {
    height: "8%",
  },
  importButton: {
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
  cancelButton: {
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
  tableData: {
    height: "100%",
  },
  icons: {
    marginRight: theme.spacing(1),
  },
  inputContainer: {
    height: "100%",
  },
  labelInput: {
    height: "100%",
    border: `1px dashed ${theme.palette.grey[300]}`,
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    transition: "0.3s",
    "&:hover": {
      backgroundColor: theme.palette.background.default,
      border: `1px dashed ${theme.palette.primary.main}`,
    },
    cursor: "pointer",
  },
  typography: {
    color: theme.palette.grey[700],
  },
  typographyBold: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  image: {
    width: "150px",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(2),
  },
  error: {
    display: "flex",
    justifyContent: "center",
  },
  loading: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  snackBar: {
    "& .MuiSnackbarContent-root": {
      padding: "0px",
    },
    "& .MuiSnackbarContent-message": {
      width: "100%",
      padding: "0px",
    },
  },
}));

export default useStyles;
