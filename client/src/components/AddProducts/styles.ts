import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
  },
  tableHead: {
    height: 60,
  },
  tableFooter: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    gap: "10px",
  },
  button: {
    borderRadius: "8px",
  },
  tableData: {
    height: 600,
  },
  icons: {
    marginRight: "5px",
  },
  inputContainer: {
    width: "100%",
    height: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "8px",
    boxSizing: "border-box",
  },
  labelInput: {
    width: "100%",
    height: 450,

    border: "1px dashed #e6e6e6",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    transition: "0.3s",
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
      border: "1px dashed #6A5DF9",
    },
    cursor: "pointer",
  },
  buttonInput: {
    width: "100%",
    height: "100%",
  },
  typography: {
    fontSize: "13px",
    textTransform: "none",
    color: "grey",
  },
  typographyBold: {
    fontSize: "16px",
    fontWeight: "bold",
    textTransform: "none",
  },
  image: {
    width: "150px",
  },
  error: {
    width: "100%",
    height: 450,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    width: "100%",
    height: 450,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
}));

export default useStyles;
