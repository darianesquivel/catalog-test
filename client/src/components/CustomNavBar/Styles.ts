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
    // border: "solid gray 1px",
    padding: "5px",
    display: "flex",
    justifyContent: "start",
    gap: "10px",
  },
  addProductBtn: {},
  icons: {
    width: "45px",
    // background: "black",
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
