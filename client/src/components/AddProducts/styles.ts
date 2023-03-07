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
  button: {
    borderRadius: "8px",
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
}));

export default useStyles;
