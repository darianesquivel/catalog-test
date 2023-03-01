import { useQuery } from "@tanstack/react-query";
import getAllCatalogs from "../../api/getAllCatalogs";
import CatalogCard from "../../components/CatalogCard/CatalogCard";
//Component
import CatalogCreator from "../../components/CatalogCard/CatalogCreator";
// MUI
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

import { useHistory } from "react-router";
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
  const { data: catalogs, status } = useQuery(["catalogs"], getAllCatalogs);
  const history = useHistory();

  return (
    <div>
      {status === "loading" ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : null}

      {status === "success" ? (
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

      {status === "error" ? (
        <div>
          <CustomAlert alertType="error" message={`an error has occurred`} />
        </div>
      ) : null}
    </div>
  );
};

export default CatalogExplorer;
