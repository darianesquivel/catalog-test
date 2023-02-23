import React, { useEffect, useState } from "react";
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
import FormCreator from "../FormCreator/FormCreator";
import updateCatalog from "../../api/updateCatalog";
import queryClientConfig from "../../ReactQuery/queryClientConfig";

export default function CustomNavBar({ className }: any) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { currentUrl, sectionInfo, setCurrentUrl } = useStore<any>(
    (state: any) => state
  );
  const history = useHistory();
  const isProductListView = /catalogs\/.+/gi.test(currentUrl);
  const isAddProducts = /addproducts\/.+/gi.test(currentUrl);
  const sectionTitle = "Catalog Explorer";
  const catalogId = currentUrl.split("/").reverse()[0];
  const handleClose = async () => {};

  useEffect(() => {
    const unlisten = history.listen((...props) => {
      const { pathname } = props?.[0] || {};
      setCurrentUrl(pathname);
    });
    return () => {
      unlisten();
    };
  }, [history, setCurrentUrl]);
  const { id, name } = sectionInfo;
  return (
    <div>
      {open && (
        <FormCreator
          isOpen={open}
          handleModal={() => setOpen(false)}
          apiFunction={updateCatalog}
          initialValues={{ name, id }}
          keysToInvalidate={[`catalogs/:${catalogId}`, catalogId]}
        />
      )}
      <AppBar
        position="fixed"
        className={`${classes.mainContainer} ${className}`}
      >
        <Toolbar className={classes.toolbar} disableGutters={true}>
          <div className={classes.mainConetnt}>
            {isProductListView || isAddProducts ? (
              <IconButton
                className={classes.icons}
                onClick={() => history.goBack()}
              >
                <FontAwesomeIcon icon={faAngleLeft} size="sm" />
              </IconButton>
            ) : (
              <div className={classes.icons}></div>
            )}

            <div className={classes.sectionName}>
              <Typography variant="h6">
                {sectionInfo?.name || sectionTitle}
              </Typography>
            </div>

            {isProductListView && (
              <IconButton
                className={classes.icons}
                onClick={() => setOpen(true)}
              >
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
