import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: { height: "65px" },
  toolbar: {
    width: "100%",
    background: "white",
    color: "black",
    display: "grid",
    gridTemplateColumns: "4fr 1fr",
    justifyContent: "space-between",
  },
  mainConetnt: {
    padding: "5px",
    display: "flex",
    justifyContent: "start",
    gap: "10px",
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
    paddingRight: "10px",
  },
}));
export default useStyles;
