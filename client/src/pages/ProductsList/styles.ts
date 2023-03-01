import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  container: {
    height: "85vh",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr",
  },

  details: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
  },
  mainBox: {
    // width: "100%",
  },
  buttonsContainer: {
    display: "flex",
    gap: "15px",
    marginBottom: "16px",
  },
  button: {
    display: "flex",
    borderRadius: "8px",
  },
  typographyButtons: {
    fontSize: "15px",
    textTransform: "capitalize",
    marginLeft: "10px",
  },
  thumbnails: {
    width: "60px",
    margin: "0 auto",
  },
  datagrid: {
    width: "100",
  },
}));

export default useStyles;
