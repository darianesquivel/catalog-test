import { useQuery } from "@tanstack/react-query";
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
  created_at?: string;
  image?: string;
  productCount: number;
  className?: any;
};
const useStyles = makeStyles(() => ({
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
}));

const CatalogExplorer = () => {
  const classes = useStyles();
  const { data: catalogs, status } = useQuery(["catalogs"], getAllCatalogs);
  return (
    <div
      className={
        !catalogs || catalogs?.length < 5
          ? classes.containerNoData
          : classes.gridContainer
      }
    >
      <CatalogCreator />
      {console.log("rerender c e")}
      {status === "success" &&
        catalogs.map((catalog: TcatalogCard) => {
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
  );
};

export default CatalogExplorer;
