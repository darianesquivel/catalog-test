import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
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
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import CatalogExplorer from "./CatalogExplorer";
import ProductsList from "./ProductsList";
import ProductDetails from "./Details/ProductDetails";
import AddProducts from "../components/AddProducts";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import CustomNavBar from "../components/CustomNavBar";
import queryClientConfig from "../config/queryClientConfig";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const drawerWidth = 240;
const drawerWidthMin = 70;

const useStyles = makeStyles((theme: Theme) =>
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

// zustand global state
export const useStore = create(
  persist(
    (set: any) => ({
      currentUrl: window.location.href,
      setCurrentUrl: (newValue: string) =>
        set((state: any) => ({ ...state, currentUrl: newValue })),
      open: false,
      setOpen: () => set((state: any) => ({ ...state, open: !state.open })),
      sectionInfo: "",
      setSectionInfo: (name: string, id?: string) =>
        set((state: any) => ({ ...state, sectionInfo: { name, id } })),
      mode: "light",
      setMode: () =>
        set((state: any) => ({
          ...state,
          mode: state.mode === "light" ? "dark" : "light",
        })),
      searchingData: { isSearching: false },
      setSearchingData: (data: any) =>
        set((state: any) => ({ ...state, searchingData: { ...data } })),
      selectedIndex: null,
      setSelectedIndex: (index: any) =>
        set((state: any) => ({
          selectedIndex: (state.selectedIndex = index),
        })),
    }),
    {
      name: "drawer-storage",
      getStorage: () => localStorage,
      partialize: (state) => {
        return Object.fromEntries(
          Object.entries(state).filter(
            ([key]) =>
              !["currentUrl", "sectionInfo", "searchingData"].includes(key)
          )
        );
      },
    }
  )
);

export default function MiniDrawer() {
  const classes = useStyles();
  const open = useStore((state: any) => state.open);
  const setOpen = useStore((state: any) => state.setOpen);
  const mode = useStore((state: any) => state.mode);
  const setMode = useStore((state: any) => state.setMode);
  const selectedIndex = useStore((state: any) => state.selectedIndex);
  const setSelectedIndex = useStore((state: any) => state.setSelectedIndex);
  const handleDrawerChange = () => {
    setOpen();
  };

  const handleListItemClick = (index: number | null) => {
    queryClientConfig.clear();
    setSelectedIndex(index);
  };

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CustomNavBar
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        />
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
            <Link
              to="/catalogs"
              className={classes.link}
              onClick={() => handleListItemClick(null)}
            >
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
                <Link to={button.link} className={classes.link} key={index}>
                  <ListItem
                    button
                    disabled={button.text === "Data Explorer" ? false : true}
                    className={
                      index === selectedIndex
                        ? classes.buttonStyleSelected
                        : classes.buttonStyle
                    }
                    onClick={(e) => handleListItemClick(index)}
                    selected={selectedIndex === index}
                    alignItems="flex-start"
                  >
                    <ListItemIcon>
                      <FontAwesomeIcon
                        className={
                          index === selectedIndex ? classes.iconSelected : ""
                        }
                        icon={button.icon}
                        size="xl"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={button.text}
                      className={classes.textButton}
                    />
                  </ListItem>
                </Link>
              ))}
            </div>
            <div>
              <ListItem button disabled className={classes.buttonStyle}>
                <ListItemIcon>
                  <FontAwesomeIcon icon={faBell} size="xl" />
                </ListItemIcon>
                <ListItemText primary={"Notifications"} />
              </ListItem>
              <ListItem
                button
                className={classes.buttonStyle}
                onClick={setMode}
              >
                <ListItemIcon>
                  <FontAwesomeIcon
                    icon={mode === "dark" ? faSun : faMoon}
                    size="xl"
                  />
                </ListItemIcon>
                <ListItemText
                  primary={mode === "dark" ? "Light Mode" : "Dark Mode"}
                />
              </ListItem>
              <ListItem
                button
                className={classes.buttonStyle}
                onClick={handleDrawerChange}
              >
                <ListItemIcon>
                  {open ? (
                    <FontAwesomeIcon icon={faChevronLeft} size="xl" />
                  ) : (
                    <FontAwesomeIcon icon={faChevronRight} size="xl" />
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
            <Route exact path="/catalogs/:id/upload" component={AddProducts} />
            <Route
              exact
              path="/catalogs/:id/:productId?"
              component={ProductsList}
            />
            <Route
              exact
              path="/catalogs/:id/:productId/details"
              component={ProductDetails}
            />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
