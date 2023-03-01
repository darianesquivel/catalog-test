import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    //CATALOGCARD
    root: {
      height: 355,
      borderRadius: "8px",
      display: "flex",
    },
    cardContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "0px",
    },
    media: {
      height: 300,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#6A5DF9",
      gap: "8px",
      textDecoration: "none",
      cursor: "pointer",
    },
    mediaContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    headerContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      boxSizing: "border-box",
    },
    footerContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    typography: {
      fontWeight: 200,
    },
    products: {
      color: "#6A5DF9",
      fontSize: "14px",
      marginBottom: "5px",
      cursor: "pointer",
    },
    createdAt: {
      display: "flex",
      alignItems: "center",
      color: "grey",
      fontWeight: "lighter",
      fontSize: "14px",
      gap: "8px",
    },
    link: {
      width: "100%",
      textDecoration: "none",
      color: "inherit",
    },

    // CATALOGCREATOR

    cardCreator: {
      height: 325,
      borderRadius: "8px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "16px",
    },
    creatorContent: {
      height: "100%",
      border: "1px dashed #6A5DF9",
      borderRadius: "4px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#6A5DF9",
      textAlign: "center",
      padding: "16px",
    },
    icon: {
      fontWeight: 800,
    },
  })
);

export default useStyles;
