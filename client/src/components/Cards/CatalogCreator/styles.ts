import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  creatorContainer: {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
  },
  cardContent: {
    height: 325,
    borderRadius: theme.shape.borderRadius / 2,
    border: `1px dashed ${theme.palette.primary.main}`,
    textAlign: "center",
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
