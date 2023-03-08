import { useCallback, useEffect, useState } from "react";
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
import { useMutateHook } from "../../hooks";
import getFilteredCatalogs from "../../api/getFilteredCatalogs";
import { useIsFetching } from "@tanstack/react-query";

export default function CustomNavBar({ className }: any) {
  const classes = useStyles();
  const getUrlTerm = useCallback(
    (url: string) => url?.match(/(?<=term=).+/gi)?.[0],
    []
  );
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");

  const {
    currentUrl,
    sectionInfo,
    setCurrentUrl,
    setSearchingData,
    setSectionInfo,
  } = useStore<any>((state: any) => state);

  const { id, name } = sectionInfo || {};

  const { mutate, isLoading } = useMutateHook(() => getFilteredCatalogs(term));

  const isCatalogLoading = useIsFetching({
    queryKey: ["catalogs"],
  });

  const isProductListView = /catalogs\/.+/gi.test(currentUrl);

  const isUpload = /\/upload$/gi.test(currentUrl);
  const isDetails = /\/details$/gi.test(currentUrl);
  const sectionTitle = isUpload
    ? "Catalog upload"
    : name
    ? name
    : "Catalog Explorer";

  const isMainSection = sectionTitle.includes("Catalog Explorer");
  // We cannot use params here because this component is outer react router
  const catalogId =
    currentUrl.match(/(?<=catalogs\/)(.+?)(?=\/)/)?.[0] ||
    currentUrl.match(/(?<=catalogs\/).+/)?.[0];

  const handleRefresh = async () => {
    queryClientConfig.invalidateQueries(["catalogs"]);
  };

  const handleSearchSubmit = () => {
    if (!term) {
      setTerm("");
      history.push("/catalogs");
    } else {
      history.push({
        pathname: "/catalogs",
        search: `?term=${term}`,
      });
      mutate(undefined, {
        onSuccess: (data: any) =>
          queryClientConfig.setQueryData(["catalogs"], data),
        onError: (err) => {
          queryClientConfig.clear();
        },
      });
    }
  };
  const handleSearchChange = (value: string) => {
    setTerm(value);
  };

  useEffect(() => {
    setSearchingData({ isSearching: isLoading });
    const searchValue: string = getUrlTerm(history.location.search) || "";
    setTerm(searchValue);
    history.listen((props) => {
      const { pathname, search } = props || {};
      setTerm(getUrlTerm(search) || "");
      setCurrentUrl(pathname + search);
    });
  }, [history, setCurrentUrl, getUrlTerm, isLoading, setSearchingData]);

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
          extraFn={(data) => {
            const { name, id } = data || {};
            if (name) setSectionInfo(name, id);
          }}
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

            {isMainSection && !isDetails ? (
              <IconButton
                color={`${!isCatalogLoading ? "primary" : "default"}`}
                className={`${classes.icons} ${
                  isCatalogLoading ? classes.rotate : ""
                }`}
                onClick={handleRefresh}
              >
                <FontAwesomeIcon icon={faRedoAlt} size="sm" />
              </IconButton>
            ) : null}
            {isProductListView && !isDetails && !isUpload ? (
              <IconButton
                className={classes.icons}
                onClick={() => setOpen(true)}
              >
                <FontAwesomeIcon icon={faPen} size="xs" />
              </IconButton>
            ) : null}
          </div>

          <div className={classes.endSection}>
            {isProductListView && !isDetails && !isUpload ? (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => history.push(`/catalogs/${catalogId}/upload`)}
                className={classes.addProductBtn}
              >
                Add products
              </Button>
            ) : isMainSection ? (
              <SearchBar
                onSubmit={handleSearchSubmit}
                initialTerm={term}
                onChange={handleSearchChange}
                searching={!!isLoading}
              />
            ) : null}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
