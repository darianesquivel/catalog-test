import React from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  faDatabase,
  faTags,
  faCogs,
  faPenNib,
  faChevronRight,
  faChevronLeft,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CatalogExplorer from "../../pages/CatalogExplorer/CatalogExplorer";
import ProductsList from "../../pages/ProductsList/ProductsList";
import ProductDetails from "../../pages/ProductDetails/ProductDetails";

const drawerButtons = [
  {
    text: "Data Explorer",
    icon: faDatabase,
  },
  {
    text: "Enrichment",
    icon: faTags,
  },
  {
    text: "Matching AI",
    icon: faCogs,
  },
  {
    text: "Scribe Voices",
    icon: faPenNib,
  },
];

const drawerWidth = 240;
const drawerWidthMin = 70;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
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
      padding: theme.spacing(3),
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
  })
);

export default function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerChange = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Catalogs Explorer
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <List className={classes.buttonList}>
          <div>
            <ListItem className={classes.drawerHeader}>
              <ListItemIcon>
                <img
                  width="24px"
                  src="https://static.remotasks.com/uploads/catalog_logo.png"
                  alt=""
                />
              </ListItemIcon>
              <Typography className={classes.drawerTitle}>Catalog</Typography>
            </ListItem>
          </div>
          <div className={classes.flexGrow}>
            {drawerButtons.map((button, index) => (
              <ListItem button key={index} className={classes.buttonStyle}>
                <ListItemIcon>
                  <FontAwesomeIcon
                    className={classes.icons}
                    icon={button.icon}
                  />
                </ListItemIcon>
                <ListItemText primary={button.text} />
              </ListItem>
            ))}
          </div>
          <div>
            <ListItem button disabled className={classes.buttonStyle}>
              <ListItemIcon>
                <FontAwesomeIcon className={classes.icons} icon={faBell} />
              </ListItemIcon>
              <ListItemText primary={"Notifications"} />
            </ListItem>
            <ListItem
              button
              className={classes.buttonStyle}
              onClick={handleDrawerChange}
            >
              <ListItemIcon>
                {open ? (
                  <FontAwesomeIcon
                    className={classes.icons}
                    icon={faChevronLeft}
                  />
                ) : (
                  <FontAwesomeIcon
                    className={classes.icons}
                    icon={faChevronRight}
                  />
                )}
              </ListItemIcon>
              <ListItemText primary={"Close"} />
            </ListItem>
          </div>
        </List>
      </Drawer>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={CatalogExplorer} />
            <Route exact path="/products" component={ProductsList} />
            <Route exact path="/details" component={ProductDetails} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}
