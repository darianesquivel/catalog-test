import { useQuery } from "@tanstack/react-query";
import getCatalogById from "../../api/getCatalogById";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import {
  faTags,
  faPenNib,
  faRocket,
  faTrash,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SummaryDetails from "../ProductDetails/SummaryDetails";
import { useState } from "react";
const useStyles = makeStyles(() => ({
  container: {
    height: 650,
    width: "100%",
    display: "flex",
  },
  mainBox: {
    width: "50%",
  },
  buttonsContainer: {
    display: "flex",
    gap: "15px",
    marginBottom: "16px",
  },
  button: {
    display: "flex",
    borderRadius: "8px",
  },
  typographyButtons: {
    fontSize: "15px",
    textTransform: "capitalize",
    marginLeft: "10px",
  },
  thumbnails: {
    width: "60px",
    margin: "0 auto",
  },
}));
const columns: GridColDef[] = [
  {
    field: "info",
    headerName: "Info",
    width: 30,
    renderCell: (params) => {
      return (
        <FontAwesomeIcon
          size="lg"
          icon={faInfoCircle}
          style={{ margin: "0 auto", cursor: "pointer" }}
          color="gray"
        />
      );
    },
  },
  {
    field: "image",
    headerName: "Image",
    width: 150,
    renderCell: (params) => <img src={params.row.image} alt="" width="80px" />,
  },
  { field: "id", headerName: "id", width: 150 },
  { field: "name", headerName: "Title", width: 150 },
  { field: "description", headerName: "Description", width: 150 },
];

const ProductsList = (props: any) => {
  const classes = useStyles();
  const catalogId = props.match.params.id;
  const [info, setInfo] = useState<object>();
  const { data: catalog } = useQuery(
    [`catalogs/:${catalogId}`, catalogId],
    () => getCatalogById(catalogId)
  );

  const products = catalog ? catalog[0].products : [];

  const rows: GridRowsProp = products;

  return (
    <div className={classes.container}>
      <div className={classes.mainBox}>
        <div className={classes.buttonsContainer}>
          <Button className={classes.button} variant="contained" disabled>
            <FontAwesomeIcon size="lg" icon={faTags} />
            <Typography className={classes.typographyButtons}>
              Enrichment
            </Typography>
          </Button>
          <Button className={classes.button} variant="contained" disabled>
            <FontAwesomeIcon size="lg" icon={faPenNib} />
            <Typography className={classes.typographyButtons}>
              Scribe
            </Typography>
          </Button>
          <Button className={classes.button} variant="contained" disabled>
            <FontAwesomeIcon size="lg" icon={faRocket} />
            <Typography className={classes.typographyButtons}>
              Assistant
            </Typography>
          </Button>
          <Button className={classes.button} variant="contained" disabled>
            <FontAwesomeIcon size="lg" icon={faTrash} />
          </Button>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
          onCellClick={(cell: any) =>
            cell.field === "info" ? setInfo(cell.row) : ""
          }
        />
      </div>
      {info && <SummaryDetails {...info} />}
    </div>
  );
};

export default ProductsList;
