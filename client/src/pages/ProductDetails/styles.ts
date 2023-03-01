import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  //SUMMARYDETAILS
  container: {
    display: "flex",
    flexFlow: "column",
    padding: 5,
    paddingLeft: 8,
    gap: 22,
    lineHeight: "20px",
    height: "100%",
  },
  header: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    gap: 12,
  },
  image: {
    width: "100%",
  },
  description: {
    padding: 2,
    lineHeight: "18px",
  },
  accordion: {
    // border: "solid 1px black",
  },
  titleSection: {},
  headerButtons: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  currentButton: {
    // borderBottom: "2px solid #6A5DF9",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  //PRODUCTDETAILS
  gridContainer: {
    background: theme.palette.background.paper,
    height: "calc(100vh - 115px)",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: theme.spacing(4),
    flexWrap: "nowrap",
  },
  leftBox: {
    background: theme.palette.background.default,
    height: "100%",
    position: "relative",
  },
  rightBox: {
    padding: theme.spacing(1, 2),
    position: "relative",
  },

  imagesContainer: {
    height: "inherit",
  },
  carousel: {
    overflow: "auto",
    height: "100%",
    width: "100%",
  },

  img: {
    cursor: "pointer",
    width: "100%",
    objectFit: "scale-down",
    maxHeight: "170px",
    paddingBottom: theme.spacing(0.5),
    "&:hover": {
      paddingBottom: theme.spacing(0),
      borderBottom: "4px solid #5A67C5",
    },
  },
  mainImgGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    background: theme.palette.background.default,
  },
  mainImage: {
    objectFit: "scale-down",
    height: "100%",
    width: "100%",
    padding: theme.spacing(0.3),
    flexGrow: 1,
  },
  accordionBox: {
    width: "100%",
  },
  headerDetails: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: theme.spacing(2),
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
  details: {
    display: "grid",
    gridTemplateColumns: "1fr",
  },
  extraStyles: {
    gap: theme.spacing(2),
    padding: theme.spacing(0),
    gridTemplateColumns: "2fr 3fr",
    overflow: "hidden",
  },
  idBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  productTitle: {
    padding: theme.spacing(0, 0, 2, 0),
  },
  productDesc: {
    display: "grid",
    gap: theme.spacing(2),
  },
  center: {
    display: "block",
    position: "absolute",
    top: "50%",
    left: "50%",
  },
}));

export default useStyles;
