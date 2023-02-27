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
import { useEffect, useMemo, useState } from "react";
import { useStore } from "../DrawerAppbar/DrawerAppbar";
import { useHistory, useParams } from "react-router";

const useStyles = makeStyles(() => ({
  container: {
    height: "85vh",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr",
  },

  details: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
  },
  mainBox: {
    // width: "100%",
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
  datagrid: {
    width: "100",
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
  const { setSectionInfo } = useStore();
  const { data: catalog } = useQuery(
    [`catalogs/:${catalogId}`, catalogId],
    () => getCatalogById(catalogId)
  );

  const products = catalog ? catalog[0].products : [];
  const rows: GridRowsProp = products;
  const params: any = useParams();
  const history = useHistory();

  useEffect(() => {
    setSectionInfo(catalog?.[0]?.name, catalog?.[0]?.id);
    const initialValues = params.productId
      ? products.find((data: any) => data.id === params.productId)
      : undefined;
    setInfo(initialValues);
    return () => setSectionInfo("");
  }, [catalog, setSectionInfo]);

  return (
    <div className={`${classes.container} ${info ? classes.details : ""}`}>
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
          className={classes.datagrid}
          rows={rows}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          checkboxSelection
          disableSelectionOnClick
          onCellClick={(cell: any) => {
            if (cell.field === "image")
              return history.push(`/catalogs/${catalogId}/${cell.id}/details`);
            if (cell.field === "info") {
              setInfo(cell.row);
              return history.push(`/catalogs/${catalogId}/${cell.id}/`);
            }
          }}
        />
      </div>
      {info && <SummaryDetails {...info} closeModal={setInfo} />}
    </div>
  );
};

export default ProductsList;
