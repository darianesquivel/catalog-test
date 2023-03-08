import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    height: "100%",
    borderRadius: theme.shape.borderRadius / 2,
    marginTop: theme.spacing(1),
  },
  headerTab: {
    textTransform: "none",
    letterSpacing: "0.05rem",
    backgroundColor: `${theme.palette.background.paper} !important`,
  },
  contentTabs: {
    marginTop: theme.spacing(1),
  },
}));

export default useStyles;
