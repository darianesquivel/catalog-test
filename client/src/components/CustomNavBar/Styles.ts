import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: { height: "65px" },
  toolbar: {
    width: "100%",
    display: "grid",
    justifyContent: "space-between",
    gridTemplateColumns: "4fr 1fr",
  },
  mainConetnt: {
    display: "flex",
    justifyContent: "start",
    padding: theme.spacing(1),
    gap: theme.spacing(1),
  },
  addProductBtn: {
    borderRadius: theme.shape.borderRadius,
    textTransform: "none",
    padding: theme.spacing(0.3, 2),
  },
  icons: {
    width: "45px",
  },
  sectionName: {
    minWidth: "45px",
    display: "flex",
    alignItems: "center",
  },
  endSection: {
    display: "flex",
    justifyContent: "end",
    paddingRight: theme.spacing(2),
  },
}));
export default useStyles;
