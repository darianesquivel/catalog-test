import { useQuery } from "@tanstack/react-query";
import getAllCatalogs from "../../api/getAllCatalogs";
import CatalogCard from "../../components/Cards/CatalogCard/CatalogCard";
//Component
import CatalogCreator from "../../components/Cards/CatalogCreator/CatalogCreator";
// MUI
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

import CustomAlert from "../../components/Alert/CustomAlert";

type TcatalogCard = {
  id: string;
  name: string;
  products?: number;
  created_at?: string;
  image?: string;
  productCount: number;
  className?: any;
};
const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax( 290px, 1fr))",
    gap: "16px",
  },
  containerNoData: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "16px",
  },
  loading: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

const CatalogExplorer = () => {
  const classes = useStyles();
  const {
    data: catalogs,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useQuery(["catalogs"], getAllCatalogs);
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
    </div>
  );
};

export default CatalogExplorer;
