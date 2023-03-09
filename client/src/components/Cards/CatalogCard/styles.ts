import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiCardContent-root": {
        paddingBottom: theme.spacing(1.5),
      },
    },
    catalogCard: {
      height: 355,
      borderRadius: theme.shape.borderRadius,
    },
    cardContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: theme.spacing(0),
    },
    media: {
      height: 300,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: theme.palette.primary.main,
      gap: theme.spacing(1),
      cursor: "pointer",
    },
    typography: {
      fontWeight: 200,
    },
    products: {
      color: theme.palette.primary.main,
      fontSize: "15px",
      marginBottom: theme.spacing(1),
      cursor: "pointer",
    },
    createdAt: {
      display: "flex",
      alignItems: "center",
      color: theme.palette.grey[500],
      fontSize: "14px",
      gap: theme.spacing(1),
      letterSpacing: "0.04em",
    },
  })
);

export default useStyles;
