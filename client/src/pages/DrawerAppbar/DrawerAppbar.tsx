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
import CatalogExplorer from "../CatalogExplorer/CatalogExplorer";
import ProductsList from "../ProductsList/ProductsList";
import ProductDetails from "../Details/ProductDetails/ProductDetails";
import AddProducts from "../../components/AddProducts/AddProducts";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import CustomNavBar from "../../components/CustomNavBar/CustomNavBar";
import { useStyles } from "./Styles";
import queryClientConfig from "../../config/queryClientConfig";

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

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
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
              onClick={() => queryClientConfig.clear()}
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
                <ListItem
                  button
                  disabled={button.text === "Data Explorer" ? false : true}
                  key={index}
                  className={
                    index === selectedIndex
                      ? classes.buttonStyleSelected
                      : classes.buttonStyle
                  }
                  onClick={(e) => handleListItemClick(e, index)}
                  selected={selectedIndex === index}
                  alignItems="flex-start"
                >
                  <Link to={button.link}>
                    <ListItemIcon>
                      <FontAwesomeIcon
                        className={
                          index === selectedIndex ? classes.iconSelected : ""
                        }
                        icon={button.icon}
                        size="xl"
                      />
                    </ListItemIcon>
                  </Link>
                  <ListItemText
                    primary={button.text}
                    className={classes.textButton}
                  />
                </ListItem>
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
