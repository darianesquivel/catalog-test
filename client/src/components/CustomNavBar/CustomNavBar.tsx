import { useEffect, useState } from "react";
import {
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import {
  faAngleLeft,
  faPen,
  faRedoAlt,
} from "@fortawesome/free-solid-svg-icons";

import useStyles from "./Styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { useStore } from "../../pages/DrawerAppbar/DrawerAppbar";
import FormCreator from "../FormCreator/FormCreator";
import updateCatalog from "../../api/updateCatalog";
import queryClientConfig from "../../config/queryClientConfig";
import SearchBar from "../SearchBar/SearchBar";

export default function CustomNavBar({ className }: any) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { currentUrl, sectionInfo, setCurrentUrl } = useStore<any>(
    (state: any) => state
  );
  const { id, name } = sectionInfo || {};
  const history = useHistory();
  const isProductListView = /catalogs\/.+/gi.test(currentUrl);
  const isUpload = /\/upload$/gi.test(currentUrl);
  const isDetails = /\/details$/gi.test(currentUrl);
  const sectionTitle = isUpload
    ? "Catalog upload"
    : name
    ? name
    : "Catalog Explorer";
  // We cannot use params here because this component is outer react router
  const catalogId =
    currentUrl.match(/(?<=catalogs\/)(.+?)(?=\/)/)?.[0] ||
    currentUrl.match(/(?<=catalogs\/).+/)?.[0];

  const handleRefresh = () => {
    queryClientConfig.invalidateQueries(["catalogs"]);
  };

  useEffect(() => {
    history.listen((...props) => {
      const { pathname, search } = props?.[0] || {};
      setCurrentUrl(pathname + search);
    });
  }, [history, setCurrentUrl]);

  return (
    <div>
      {open && (
        <FormCreator
          isOpen={open}
          onModalChange={() => setOpen(false)}
          apiFunction={updateCatalog}
          initialValues={{ name, id }}
          keysToInvalidate={[`catalogs/:${catalogId}`, catalogId]}
          acceptBtnName="Update"
        />
      )}
      <AppBar
        position="fixed"
        className={`${classes.mainContainer} ${className}`}
      >
        <Toolbar className={classes.toolbar} disableGutters={true}>
          <div className={classes.mainContent}>
            {isProductListView || isUpload ? (
              <IconButton
                className={classes.icons}
                onClick={() => {
                  if (isDetails || isUpload) history.goBack();
                  else history.push("/catalogs");
                }}
              >
                <FontAwesomeIcon icon={faAngleLeft} size="sm" />
              </IconButton>
            ) : null}

            <div className={classes.sectionName}>
              <Typography variant="h6">{sectionTitle}</Typography>
            </div>

            {sectionTitle.includes("Catalog Explorer") && !isDetails && (
              <IconButton className={classes.icons} onClick={handleRefresh}>
                <FontAwesomeIcon icon={faRedoAlt} size="sm" />
              </IconButton>
            )}

            {isProductListView && !isDetails && !isUpload && (
              <IconButton
                className={classes.icons}
                onClick={() => setOpen(true)}
              >
                <FontAwesomeIcon icon={faPen} size="xs" />
              </IconButton>
            )}
          </div>

          <div className={classes.endSection}>
            {isProductListView && !isDetails && !isUpload && (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => history.push(`/catalogs/${catalogId}/upload`)}
                className={classes.addProductBtn}
              >
                Add products
              </Button>
            )}
            {sectionTitle.includes("Catalog Explorer") && !isDetails && (
              <SearchBar />
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
