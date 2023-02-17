import { useQuery, useQueryClient } from "@tanstack/react-query";
import getAllCatalogs from "../../api/getAllCatalogs";
import CatalogCard from "../../components/CatalogCard/CatalogCard";
//Component
import CatalogCreator from "../../components/CatalogCard/CatalogCreator";
// MUI
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

type TcatalogCard = {
  id: string;
  name: string;
  products?: number;
  createdAt?: string;
  image?: string;
  className?: any;
};
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexFlow: "row wrap",
    padding: "16px",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    gap: "16px",
    background: "#555",
  },
  children: {
    flexGrow: 1,
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
  return (
    <div className={classes.container}>
      <CatalogCreator className={classes.children} />
      {status === "success" &&
        catalogs.map((catalog: TcatalogCard) => {
          return (
            <CatalogCard
              className={classes.children}
              key={catalog.id}
              {...catalog}
            />
          );
        })}
    </div>
  );
};

export default CatalogExplorer;
