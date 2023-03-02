import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  creatorContainer: {
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
  },
  cardContent: {
    height: theme.spacing(40),
    borderRadius: theme.spacing(0.5),
    border: `1px dashed #6A5DF9`,
    textAlign: "center",
    color: "#6A5DF9",
  },
}));

export default useStyles;