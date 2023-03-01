import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax( 290px, 1fr))",
    gap: "16px",
  },
  containerNoData: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "16px",
  },
  loading: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

export default useStyles;
