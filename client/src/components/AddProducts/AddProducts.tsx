import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
// utils
import addProducts from "../../api/addProducts";
import Papa from "papaparse";
import { useStore } from "../../pages/DrawerAppbar/DrawerAppbar";
import { useMutateHook } from "../../hooks";

import CustomAlert from "../Alert/CustomAlert";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CustomSnackBar from "../CustomSnackbar/CustomSnackbar";
import { columnsCreator } from "../helpers";

// Components
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

//FA
import {
  faArrowUpFromBracket,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//STYLES
import useStyles from "./styles";
import cleanJson from "../../api/cleanJson";

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
  const { mutate, isLoading, isSuccess, isError, error } = useMutateHook(() =>
    addProducts(catalogId, data)
  );
  const { setSectionInfo, setNotifications } = useStore();

  useEffect(() => () => setSectionInfo(""), [setSectionInfo]);

  const handleFile = async (e: any) => {
    const file = e.target.files[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (result) => {
        const csvData: any = result.data;
        const sanitizedData = await cleanJson(catalogId, csvData);
        setUpload(false);
        setData(sanitizedData);
        setPreview(true);
      },
    });
  };
  const customColumns = [...columns, ...columnsCreator(data)];

  const handleCancel = () => {
    setPreview(false);
    setUpload(true);
    setData([]);
  };

  const handleSubmit = async () => {
    mutate(undefined, {
      onSuccess: (responseMessage: any) => {
        setNotifications(responseMessage);
      },
    });
  };

  const handleIsSuccess = () => {
    history.push(`/catalogs/${catalogId}`);
  };

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell>
              <div className={classes.header}>
                <div>
                  <FontAwesomeIcon
                    className={classes.icons}
                    icon={faArrowUpFromBracket}
                  />
                  Upload File
                </div>
                <IconButton onClick={() => history.goBack()}>
                  <FontAwesomeIcon icon={faClose} size="sm" />
                </IconButton>
              </div>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody className={classes.tableBody}>
          <TableRow>
            <TableCell>
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
                    <Typography
                      className={classes.typographyBold}
                      variant={"body1"}
                    >
                      What data do you wish to import?
                    </Typography>
                    <Typography
                      className={classes.typography}
                      variant={"caption"}
                    >
                      Upload a CSV or Excel file to start the import process.
                    </Typography>
                  </label>
                </div>
              ) : null}

              {isError ? (
                <div className={classes.error}>
                  <CustomAlert
                    alertType="error"
                    message={`There was an error creating the catalog: ${error}`}
                  />
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
                  <CustomSnackBar
                    message={`Products were successfully loaded`}
                    onClose={handleIsSuccess}
                    open={isSuccess}
                  />
                </Dialog>
              ) : null}

              {preview &&
              !isError &&
              !isLoading &&
              !isSuccess &&
              data.length > 0 ? (
                <DataGrid
                  rows={data}
                  // @ts-ignore
                  columns={customColumns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  checkboxSelection
                  disableSelectionOnClick
                  className={classes.tableData}
                  getRowId={(row: any) => row.title}
                />
              ) : null}

              {preview && data.length < 1 ? (
                <Dialog
                  open={data.length < 1}
                  onClose={handleCancel}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <CustomAlert
                    alertType="error"
                    message={`The columns: id , title , description , image are required to upload a csv`}
                    closeIcon={true}
                    onClose={handleCancel}
                  />
                </Dialog>
              ) : null}
            </TableCell>
          </TableRow>

          <TableRow className={classes.tableFooter}>
            <TableCell>
              {preview &&
              !isError &&
              !isLoading &&
              !isSuccess &&
              data.length > 0 ? (
                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    className={classes.importButton}
                    disabled={data.length < 1}
                    onClick={handleSubmit}
                  >
                    Upload file
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCancel}
                    className={classes.cancelButton}
                  >
                    Cancel
                  </Button>
                </div>
              ) : null}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
