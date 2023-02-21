import { useEffect, useState } from "react";
import queryClientConfig from "../../ReactQuery/queryClientConfig";
import CustomAlert from "../Alert/CustomAlert";

// API
import createCatalog from "../../api/createCatalog";
// MUI
import { Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  dialog: {
    position: "relative",
  },
  container: {
    width: "500px",
    margin: "0 auto",
    padding: "30px",
    display: "flex",
    flexFlow: "column",
    gap: "20px",
  },
  button: {
    width: "40px",
    alignSelf: "flex-end",
    objectFit: "contain",
  },
  cancelButton: {
    color: "rgb(43, 153, 216)",
    background: "rgba(43, 153, 216, 0.2)",
  },
  buttonWrapper: {
    display: "flex",
    alignItems: "center",
    minWidth: "70px",
    justifyContent: "center",
    position: "relative",
  },
  buttonProgress: {
    color: "green[500]",
    // position: "absolute",
  },
  dialogActions: {},
}));
// types
type Tcatalog = {
  name: string;
  id: string;
  description: string;
};
type Tprops = {
  handleModal: () => void;
  isOpen: boolean;
  apiFunction: (...params: any) => any;
  initialValues?: {
    name?: string;
    id: string;
  };
};

const FormCreator = ({
  handleModal,
  isOpen,
  apiFunction,
  initialValues,
}: Tprops) => {
  const classes = useStyles();
  const [fields, setFields] = useState<any>(
    initialValues || { name: "", id: "" }
  );
  const [error, setError] = useState("");
  const [submiting, setSubmiting] = useState(false);
  const [created, setCreated] = useState(false);

  const handleChange = (e: any) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (fields?.name && !onValidate(fields.name)) {
      try {
        setSubmiting(true);
        await apiFunction(fields);
        setFields({});
        setSubmiting(false);
        setCreated(true);
      } catch (err: any) {
        setError(err);
        setSubmiting(false);
      }
    }
  };

  const handleClose = async () => {
    setFields({ name: "", id: "" });
    setError("");
    setCreated(false);
    handleModal();
    await queryClientConfig.invalidateQueries(["catalogs"]);
  };
  const onValidate = (field = "") => {
    if (field.length < 1) return "You need to specify a name for the catalog";
    return null;
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.dialog}
    >
      {created ? (
        <CustomAlert
          alertType="success"
          message="The catalog was created successfully"
        />
      ) : (
        isOpen && (
          <DialogContent>
            <form className={classes.container} onSubmit={handleSubmit}>
              <TextField
                name="name"
                autoFocus
                error={!!onValidate(fields.name)}
                label="Catalog name"
                value={fields.name}
                helperText={onValidate(fields.name)}
                variant="outlined"
                onChange={handleChange}
              />
              {error && (
                <CustomAlert
                  alertType="error"
                  message={`There was an error creating the catalog: ${error}`}
                />
              )}
              <DialogActions className={classes.dialogActions}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleModal}
                  className={classes.cancelButton}
                >
                  Cancel
                </Button>
                <div className={classes.buttonWrapper}>
                  {submiting ? (
                    <CircularProgress
                      size={28}
                      className={classes.buttonProgress}
                    />
                  ) : (
                    <Button
                      className={`${classes.button}`}
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={handleSubmit}
                    >
                      Create
                    </Button>
                  )}
                </div>
              </DialogActions>
            </form>
          </DialogContent>
        )
      )}
    </Dialog>
  );
};

export default FormCreator;
