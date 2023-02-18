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
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax( 220px, 1fr))",
    gap: "16px",
  },
  containerNoData: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "16px",
  },
}));

const CatalogExplorer = () => {
  const classes = useStyles();
  const { data: catalogs, status } = useQuery(["catalogs"], getAllCatalogs);
  return (
    <div
      className={
        !catalogs?.length ? classes.containerNoData : classes.gridContainer
      }
    >
      <CatalogCreator />
      {/* {isLoading && "Loading..."} */}
      {/* {error && (error as Error).message} */}
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
