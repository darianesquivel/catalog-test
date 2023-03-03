import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax( 290px, 1fr))",
    gap: theme.spacing(2),
  },
  containerNoData: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: theme.spacing(2),
  },
  loading: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

export default useStyles;
