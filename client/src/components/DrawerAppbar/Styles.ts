import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
const drawerWidth = 240;
const drawerWidthMin = 70;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      boxShadow: "none",
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
      zIndex: theme.zIndex.drawer - 1,
      width: `calc(100% - ${drawerWidthMin}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.getContrastText(theme.palette.background.paper),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(1),
    },
    buttonList: {
      height: "100vh",
      padding: "8px 8px",
      display: "flex",
      flexDirection: "column",
    },
    icons: {
      fontSize: "1.30em",
    },
    buttonStyle: {
      borderRadius: "8px",
      marginBottom: "6px",
      color: "#0000008a",
    },
    drawerHeader: {
      borderRadius: "8px",
      marginBottom: "6px",
    },
    drawerTitle: {
      fontSize: "18px",
    },
    flexGrow: {
      flexGrow: 1,
    },
    link: {
      color: "inherit",
      textDecoration: "none",
      "&:hover": {
        fontSize: "50px",
      },
    },
  })
);
