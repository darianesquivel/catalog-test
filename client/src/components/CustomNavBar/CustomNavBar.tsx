import React, { useEffect } from "react";
import {
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import { faAngleLeft, faPen } from "@fortawesome/free-solid-svg-icons";
import useStyles from "./Styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import { useStore } from "../DrawerAppbar/DrawerAppbar";

export default function CustomNavBar({ className }: any) {
  const classes = useStyles();
  const { currentUrl, sectionName, setCurrentUrl } = useStore<any>(
    (state: any) => state
  );
  const history = useHistory();
  const isProductListView = /catalogs\/.+/gi.test(currentUrl);
  const isAddProducts = /addproducts\/.+/gi.test(currentUrl);
  const sectionTitle = "Catalog Explorer";

  useEffect(() => {
    const unlisten = history.listen((...props) => {
      const { pathname } = props?.[0] || {};
      setCurrentUrl(pathname);
    });
    return () => {
      unlisten();
    };
  }, [history, setCurrentUrl]);

  return (
    <div>
      <AppBar
        position="fixed"
        className={`${classes.mainContainer} ${className}`}
      >
        <Toolbar className={classes.toolbar} disableGutters={true}>
          <div className={classes.mainConetnt}>
            {isProductListView || isAddProducts ? (
              <IconButton
                className={classes.icons}
                onClick={() => {
                  history.goBack();
                  setCurrentUrl(history.location);
                }}
              >
                <FontAwesomeIcon icon={faAngleLeft} size="sm" />
              </IconButton>
            ) : (
              <div className={classes.icons}></div>
            )}

            <div className={classes.sectionName}>
              <Typography variant="h6">
                {sectionName || sectionTitle}
              </Typography>
            </div>

            {isProductListView && (
              <IconButton className={classes.icons}>
                <FontAwesomeIcon icon={faPen} size="sm" />
              </IconButton>
            )}
          </div>

          <div className={classes.endSection}>
            {isProductListView && (
              <Button variant="outlined" color="primary">
                Add products
              </Button>
            )}
            {/* {searchBar && <SearchBar />} */}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
