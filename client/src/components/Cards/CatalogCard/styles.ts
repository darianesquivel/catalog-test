import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    catalogCard: {
      height: 355,
      borderRadius: theme.spacing(1),
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
      fontSize: theme.spacing(1.8),
      marginBottom: theme.spacing(1),
      cursor: "pointer",
    },
    createdAt: {
      display: "flex",
      alignItems: "center",
      color: theme.palette.grey[600],
      fontWeight: "lighter",
      fontSize: theme.spacing(1.7),
      gap: theme.spacing(1),
    },
  })
);

export default useStyles;
