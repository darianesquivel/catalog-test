import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "calc(100vh - 145px)",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr",
  },

  details: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
  },
  mainBox: {
    height: "calc(100vh - 145px)",
  },
  buttonsContainer: {
    display: "flex",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    display: "flex",
    borderRadius: theme.shape.borderRadius,
  },
  typographyButtons: {
    fontSize: "15px",
    textTransform: "capitalize",
    marginLeft: theme.spacing(2),
  },
  thumbnails: {
    width: "60px",
    margin: theme.spacing(0, "auto"),
  },
  datagrid: {
    width: "100",
  },
  loading: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

export default useStyles;
