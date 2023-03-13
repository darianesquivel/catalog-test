import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const drawerWidth = 240;
const drawerWidthMin = 70;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& .Mui-selected": {
        backgroundColor: theme.palette.primary.light,
      },
    },

    appBar: {
      boxShadow: "none",
      borderBottom: `${theme.spacing(1) / 8}px solid ${
        theme.palette.action.focus
      }`,
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
      padding: theme.spacing(2),
      minHeight: "100vh",
    },
    buttonList: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(1, 1),
    },
    buttonStyle: {
      borderRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing(1),
      color: theme.palette.grey[600],
    },
    buttonStyleSelected: {
      color: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing(1),
      "&:hover": {
        backgroundColor: `${theme.palette.primary.light} !important`,
      },
    },
    iconSelected: {
      color: theme.palette.primary.main,
    },
    textButton: {
      letterSpacing: "0.04em",
    },
    drawerHeader: {
      borderRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing(1),
    },
    drawerTitle: {
      fontSize: "18px",
      letterSpacing: "0.04em",
    },
    flexGrow: {
      flexGrow: 1,
    },
    link: {
      color: theme.palette.text.primary,
      textDecoration: "none",
    },
  })
);
