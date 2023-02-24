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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import CatalogExplorer from "../../pages/CatalogExplorer/CatalogExplorer";
import ProductsList from "../../pages/ProductsList/ProductsList";
import ProductDetails from "../../pages/ProductDetails/ProductDetails";
import AddProducts from "../AddProducts/AddProducts";
import "../../app.css";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import CustomNavBar from "../CustomNavBar/CustomNavBar";
import { useStyles } from "./Styles";
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
    }),
    {
      name: "drawer-storage",
      getStorage: () => localStorage,
      partialize: (state) => {
        return Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["currentUrl", "sectionInfo"].includes(key)
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

  const handleDrawerChange = () => {
    setOpen();
  };

  return (
    <BrowserRouter>
      <div className={`${classes.root} App`}>
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
