import { makeStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) => ({
  //DETAILTABLE
  container: {
    fontFamily: "Inter, -apple-system, Arial, Sans-Serif",
    padding: theme.spacing(1.2),
    overflow: "auto",
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    gap: theme.spacing(2),
    rowGap: theme.spacing(2),
    justifyContent: "space-between",
  },
  bold: {
    fontWeight: "bold",
  },
  bullet: {
    cursor: "pointer",
  },
  ellipsis: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  //CUSTOMTABS
  content: {
    height: "100%",
  },
}));

export default useStyles;
