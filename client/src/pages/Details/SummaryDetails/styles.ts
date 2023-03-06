import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "calc(100vh - 145px)",
    display: "flex",
    flexFlow: "column",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    gap: theme.spacing(3),
  },
  header: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    gap: theme.spacing(1),
    padding: theme.spacing(1),
  },
  image: {
    width: "100%",
  },
  description: {
    padding: theme.spacing(1),
    lineHeight: "18px",
  },
  accordion: {},
  titleSection: {},
  headerButtons: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  currentButton: {},
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
}));

export default useStyles;