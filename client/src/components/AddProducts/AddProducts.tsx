import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import addProducts from "../../api/addProducts";
import { useHistory } from "react-router-dom";

import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { useStore } from "../DrawerAppbar/DrawerAppbar";
import { useParams } from "react-router-dom";

type TProducts = {
  id: string;
};

const columns: GridColDef[] = [
  {
    field: "image",
    headerName: "Image",
    width: 150,
    renderCell: (params) => <img src={params.row.image} alt="" width="80px" />,
  },
  { field: "id", headerName: "Id", width: 150 },
  { field: "title", headerName: "Title", width: 150 },
  { field: "description", headerName: "Description", width: 150 },
];

const useStyles = makeStyles(() => ({
  table: {
    width: "100%",
  },
  tableHead: {
    height: 60,
  },
  tableFooter: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    gap: "10px",
  },
  button: {
    borderRadius: "8px",
  },
  tableData: {
    height: 600,
  },
  icons: {
    marginRight: "5px",
  },
  inputContainer: {
    width: "100%",
    height: 500,

    display: "flex",
    justifyContent: "center",
    padding: "20px",
    borderRadius: "8px",
    boxSizing: "border-box",
  },
  buttonInput: {
    width: "100%",
    border: "1px dashed #6A5DF9",
  },
  typography: {
    fontSize: "13px",
    textTransform: "none",
    color: "grey",
  },
  typographyBold: {
    fontSize: "16px",
    fontWeight: "bold",
    textTransform: "none",
  },
  image: {
    width: "150px",
  },
}));

export default function AddProducts() {
  const [data, setData] = useState([]);
  const [viewData, setViewData] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams<TProducts>();

  const { setSectionInfo } = useStore();
  useEffect(() => () => setSectionInfo(""), [setSectionInfo]);

  const handleFile = (e: any) => {
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const csvData: any = result.data;
        // this is only temporal to avoid crashing the app
        // Darian to handle the errors
        const sanitizedData = csvData
          .map((obj: any) => {
            const { id, description, title, image } = obj || {};
            return { id, description, title, image };
          })
          .filter((obj: any) => obj.description && obj.title && obj.image);

        setData(sanitizedData);
        setViewData(true);
      },
    });
  };

  const handleCancel = () => {
    setViewData(false);
    setData([]);
  };

  const handleSubmit = async () => {
    // the catalogId is added to the products uploaded via CSV
    const fulldata = data.map((product: any) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      image: product.image,
      catalog_id: id,
    }));
    await addProducts(fulldata);
    setViewData(false);
    history.push(`/catalogs/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell>
              <FontAwesomeIcon
                className={classes.icons}
                icon={faArrowUpFromBracket}
              />
              Upload File
            </TableCell>
          </TableRow>
        </TableHead>
        {!viewData ? (
          <div className={classes.inputContainer}>
            <Button className={classes.buttonInput}>
              <input
                accept={".csv"}
                id="contained-button-file"
                type="file"
                hidden
                onChange={handleFile}
              />
              <label htmlFor="contained-button-file">
                <img
                  src="https://duploservices-prod01-public2-415703579972.s3.amazonaws.com/scale-illustration-74a56dd7b4daa3127c4605c7475d1b10.png"
                  alt=""
                  className={classes.image}
                />
                <Typography className={classes.typographyBold}>
                  What data do you wish to import?
                </Typography>
                <Typography className={classes.typography}>
                  Upload a CSV or Excel file to start the import process.
                </Typography>
              </label>
            </Button>
          </div>
        ) : (
          <TableBody className={classes.tableData}>
            <TableRow>
              <TableCell align="center">
                <DataGrid
                  rows={data}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  checkboxSelection
                  disableSelectionOnClick
                  className={classes.tableData}
                  getRowId={(row: any) => row.title}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        )}

        {/* Reder result table */}

        <TableHead className={classes.tableFooter}>
          {viewData ? (
            <>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={data.length < 1}
                onClick={handleSubmit}
              >
                Import Products
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
                className={classes.button}
              >
                Cancel
              </Button>
            </>
          ) : null}
        </TableHead>
      </Table>
    </TableContainer>
  );
}
