import { useQuery, useQueryClient } from "@tanstack/react-query";
import getAllCatalogs from "../../api/getAllCatalogs";
import CatalogCard from "../../components/CatalogCard/CatalogCard";
//Component
import CatalogCreator from "../../components/CatalogCard/CatalogCreator";
// MUI
import { makeStyles } from "@material-ui/core/styles";

type TcatalogCard = {
  id: string;
  name: string;
  products?: number;
  createdAt?: string;
  image?: string;
  productCount: number;
  className?: any;
};
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    gap: "16px",
    // background: "#555",
  },
}));

const CatalogExplorer = () => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const {
    data: catalogs,
    status,
    isLoading,
    error,
  } = useQuery(["catalogs"], getAllCatalogs);
  console.log({ status, isLoading, error });
  console.log("catalogs", catalogs);

  return (
    <div className={classes.container}>
      <CatalogCreator />
      {status === "success" &&
        catalogs.map((catalog: TcatalogCard) => {
          return (
            <CatalogCard
              key={catalog.id}
              id={catalog.id}
              name={catalog.name}
              createdAt={catalog.createdAt}
              productCount={catalog.productCount}
            />
          );
        })}
    </div>
  );
};

export default CatalogExplorer;
