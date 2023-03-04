import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
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
    overflow: "auto",
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
    paddingBottom: theme.spacing(0.25),
    "&:hover": {
      paddingBottom: theme.spacing(0),
      borderBottom: `2px solid ${theme.palette.primary.main}`,
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
  header: {
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
    padding: theme.spacing(1, 2, 2, 2),
  },
  extraStyles: {},
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
