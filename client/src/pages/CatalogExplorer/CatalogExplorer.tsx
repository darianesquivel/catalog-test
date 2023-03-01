import { useQuery } from "@tanstack/react-query";
import getAllCatalogs from "../../api/getAllCatalogs";
import CatalogCard from "../../components/CatalogCard/CatalogCard";
//Component
import CatalogCreator from "../../components/CatalogCard/CatalogCreator";
// MUI
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, IconButton, Typography } from "@material-ui/core";
import { ReplayOutlined } from "@material-ui/icons";

import { useHistory } from "react-router";

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
  error: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const CatalogExplorer = () => {
  const classes = useStyles();
  const { data: catalogs, status } = useQuery(["catalogs"], getAllCatalogs);
  const history = useHistory();

  const handleReLoad = () => {
    history.push("/catalogs");
  };
  console.log("status", status);
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
        <div className={classes.error}>
          <Typography>an error has occurred</Typography>
          <IconButton
            onClick={handleReLoad}
            color="primary"
            aria-label="reload"
          >
            <ReplayOutlined />
          </IconButton>
        </div>
      ) : null}
    </div>
  );
};

export default CatalogExplorer;
