import { useQuery } from "@tanstack/react-query";
import getCatalogById from "../../api/getCatalogById";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { makeStyles } from "@material-ui/core/styles";

const columns: GridColDef[] = [
  { field: "image", headerName: "Image", width: 150 },
  { field: "id", headerName: "id", width: 150 },
  { field: "name", headerName: "Title", width: 150 },
  { field: "description", headerName: "Description", width: 150 },
];
const useStyles = makeStyles(() => ({
  container: {
    height: 650,
    width: "100%",
  },
}));
const ProductsList = (props: any) => {
  const classes = useStyles();

  const catalogId = props.match.params.id;

  const { data: catalog } = useQuery(
    [`catalogs/:${catalogId}`, catalogId],
    () => getCatalogById(catalogId)
  );

  const products = catalog ? catalog[0].products : [];

  const rows: GridRowsProp = products;

  return (
    <div className={classes.container}>
      <div></div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default ProductsList;
