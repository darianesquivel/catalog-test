import { useQuery } from "@tanstack/react-query";
import getAllCatalogs from "../../api/getAllCatalogs";
import getFilteredCatalogs from "../../api/getFilteredCatalogs";
import CatalogCard from "../../components/Cards/CatalogCard/CatalogCard";
import CustomAlert from "../../components/Alert/CustomAlert";
//Component
import CatalogCreator from "../../components/Cards/CatalogCreator/CatalogCreator";
// MUI
import { CircularProgress, Snackbar } from "@material-ui/core";
// REACT
import { useHistory } from "react-router";
import { useCallback, useState } from "react";

// STYLES
import useStyles from "./styles";
import queryClientConfig from "../../config/queryClientConfig";

type TcatalogCard = {
  id: string;
  name: string;
  products?: number;
  created_at?: string;
  image?: string;
  productCount: number;
  className?: any;
};

const CatalogExplorer = (props: any) => {
  const classes = useStyles();
  const history = useHistory();
  queryClientConfig.invalidateQueries(["catalogs"]); // it is required when clicking to the catalog explorer button
  // could not use useSearchQueryParams
  const getUrlTerm = useCallback(
    (url: string) => url?.match(/(?<=term=).+/gi)?.[0],
    []
  );

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
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : null}

      {isSuccess ? (
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
                createdAt={catalog["created_at"]}
                productCount={catalog.productCount}
                products={catalog.products}
              />
            );
          })}
        </div>
      ) : null}

      {isError ? (
        <div>
          <CustomAlert
            alertType="error"
            message={`An error occurred while loading the catalogs: ${error}`}
          />
        </div>
      ) : null}
      {!catalogs?.length && !isLoading && query ? (
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
    </div>
  );
};

export default CatalogExplorer;
