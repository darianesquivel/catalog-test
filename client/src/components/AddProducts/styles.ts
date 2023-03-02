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
    borderRadius: theme.spacing(1),
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
    borderRadius: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    transition: "0.3s",
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
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
