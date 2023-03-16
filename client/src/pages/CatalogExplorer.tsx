import { useQuery } from "@tanstack/react-query";
import getAllCatalogs from "../api/getAllCatalogs";
import getFilteredCatalogs from "../api/getFilteredCatalogs";
import CatalogCard from "../components/Cards/CatalogCard";
import CustomAlert from "../components/CustomAlert";
import { useStore } from "./DrawerAppbar";
//Component
import CatalogCreator from "../components/Cards/CatalogCreator";
// MUI
import { CircularProgress, Snackbar } from "@material-ui/core";
// REACT
import { useHistory } from "react-router";
import { useCallback, useState } from "react";

// STYLES
import { makeStyles } from "@material-ui/core/styles";

import CustomNavBar from "../components/CustomNavBar";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax( 290px, 1fr))",
    gap: theme.spacing(2),
  },
  containerNoData: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: theme.spacing(2),
  },
  loading: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

type TcatalogCard = {
  id: string;
  name: string;
  products?: number;
  createdAt: string;
  image?: string;
  productCount: number;
  className?: any;
};

const CatalogExplorer = (props: any) => {
  const classes = useStyles();
  const history = useHistory();
  // could not use useSearchQueryParams
  const getUrlTerm = useCallback(
    (url: string) => url?.match(/(?<=term=).+/gi)?.[0],
    []
  );
  const { searchingData } = useStore((state) => state);
  const query = getUrlTerm(history.location.search);
  const [open, setOpen] = useState(true);

  const {
    data: catalogs,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useQuery<any>(["catalogs"], () => {
    // we declare term here to get the last url data
    const term = getUrlTerm(history.location.search);
    if (term) {
      return getFilteredCatalogs(term);
    } else {
      return getAllCatalogs();
    }
  });
  const handleSnackBar = () => setOpen(false);

  return (
    <div>
      <CustomNavBar />
      {catalogs && !catalogs.length && !isLoading && query ? (
        <div>
          <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleSnackBar}
            style={{ top: "80px" }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <CustomAlert
              // onClose={handleClose}
              title="Not found"
              alertType="info"
              message={`Catalogs not found with the name: ${query}`}
            />
          </Snackbar>
        </div>
      ) : null}

      {isError ? (
        <div>
          <CustomAlert
            alertType="error"
            message={`An error occurred while loading the catalogs: ${error}`}
          />
        </div>
      ) : isLoading || searchingData.isSearching ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : isSuccess ? (
        <div
          className={
            !catalogs || catalogs?.length < 5
              ? classes.containerNoData
              : classes.gridContainer
          }
        >
          <CatalogCreator />
          {catalogs.map((catalog: TcatalogCard) => {
            return (
              <CatalogCard
                key={catalog.id}
                id={catalog.id}
                name={catalog.name}
                createdAt={catalog["createdAt"]}
                productCount={catalog.productCount}
                products={catalog.products}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default CatalogExplorer;
