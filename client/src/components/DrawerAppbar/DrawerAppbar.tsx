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
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import CatalogExplorer from "../../pages/CatalogExplorer/CatalogExplorer";
import ProductsList from "../../pages/ProductsList/ProductsList";
import ProductDetails from "../../pages/ProductDetails/ProductDetails";
import AddProducts from "../AddProducts/AddProducts";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const drawerButtons = [
  {
    text: "Data Explorer",
    icon: faDatabase,
    link: "/catalogs",
  },
  {
    text: "Enrichment",
    icon: faTags,
    link: "",
  },
  {
    text: "Matching AI",
    icon: faCogs,
    link: "",
  },
  {
    text: "Scribe Voices",
    icon: faPenNib,
    link: "",
  },
];

const drawerWidth = 240;
const drawerWidthMin = 70;

// zustand global state
const useStore = create(
  persist(
    (set: any) => ({
      open: false,
      setOpen: () => set((state: any) => ({ ...state, open: !state.open })),
    }),
    {
      name: "drawer-storage",
      getStorage: () => localStorage,
    }
  )
);

const useStyles = makeStyles((theme: Theme) =>
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

export default function MiniDrawer() {
  const classes = useStyles();
  const open = useStore((state: any) => state.open);
  const setOpen = useStore((state: any) => state.setOpen);

  const handleDrawerChange = () => {
    setOpen();
  };

  return (
    <BrowserRouter>
      <div className={classes.root}>
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
            <Link to="/catalogs" className={classes.link}>
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
            </Link>

            <div className={classes.flexGrow}>
              {drawerButtons.map((button, index) => (
                <ListItem
                  button
                  disabled={button.text === "Data Explorer" ? false : true}
                  key={index}
                  className={classes.buttonStyle}
                >
                  <Link to={button.link}>
                    <ListItemIcon>
                      <FontAwesomeIcon
                        className={classes.icons}
                        icon={button.icon}
                      />
                    </ListItemIcon>
                  </Link>
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

          <Switch>
            <Route exact path="/" component={CatalogExplorer} />
            <Route exact path="/catalogs" component={CatalogExplorer} />
            <Route exact path="/catalogs/:id" component={ProductsList} />
            <Route exact path="/details" component={ProductDetails} />
            <Route exact path="/addproducts/:id" component={AddProducts} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
