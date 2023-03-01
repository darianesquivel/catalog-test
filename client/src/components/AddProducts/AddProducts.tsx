import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import addProducts from "../../api/addProducts";
import Papa from "papaparse";
import { useStore } from "../../pages/DrawerAppbar/DrawerAppbar";
import { useMutateHook } from "../../hooks";

//MUI
import {
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ReplayOutlined } from "@material-ui/icons";

//FA
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//STYLES
import useStyles from "./styles";

import CustomDialog from "../CustomDialog/CustomDialog";
import CustomAlert from "../Alert/CustomAlert";

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

export default function AddProducts() {
  const [data, setData] = useState([]);
  const [preview, setPreview] = useState(false);
  const [upload, setUpload] = useState(true);
  const history = useHistory();
  const classes = useStyles();
  const { id: catalogId } = useParams<{ id: string }>();
  const { mutate, isLoading, isSuccess, isError } = useMutateHook(() =>
    addProducts(catalogId, data)
  );

  const { setSectionInfo } = useStore();
  useEffect(() => () => setSectionInfo(""), [setSectionInfo]);

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const csvData: any = result.data;

        const sanitizedData = csvData
          .map((obj: any) => {
            const { id, description, title, image } = obj || {};
            return { id, description, title, image, catalog_id: catalogId };
          })
          .filter((obj: any) => obj.description && obj.title && obj.image);
        setUpload(false);
        setData(sanitizedData);
        setPreview(true);
      },
    });
  };

  const handleCancel = () => {
    setPreview(false);
    setUpload(true);
    setData([]);
  };

  const handleSubmit = async () => {
    mutate();
  };

  const handleReLoad = () => {
    history.go(0);
  };

  const handleIsSuccess = () => {
    history.push(`/catalogs/${catalogId}`);
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

        {upload ? (
          <div className={classes.inputContainer}>
            <input
              accept={".csv"}
              id="contained-button-file"
              type="file"
              hidden
              onChange={handleFile}
            />
            <label
              className={classes.labelInput}
              htmlFor="contained-button-file"
            >
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
          </div>
        ) : null}

        {isError ? (
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

        {isLoading ? (
          <div className={classes.loading}>
            <Typography> Loading </Typography>
            <CircularProgress />
          </div>
        ) : null}

        {isSuccess ? (
          <Dialog
            open={isSuccess}
            onClose={handleIsSuccess}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <CustomAlert
              alertType="success"
              message={`Products were successfully loaded`}
              closeIcon={true}
              onClose={handleIsSuccess}
            />
          </Dialog>
        ) : null}

        {preview && !isError && !isLoading && !isSuccess ? (
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
        ) : null}

        <TableHead className={classes.tableFooter}>
          {preview && !isError && !isLoading && !isSuccess ? (
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
