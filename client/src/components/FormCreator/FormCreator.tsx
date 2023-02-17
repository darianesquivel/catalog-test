import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
// API
import createCatalog from "../../api/createCatalog";
import getAllCatalogs from "../../api/getAllCatalogs";
// MUI
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
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
};

const FormCreator = ({ handleModal, isOpen }: Tprops) => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const [fields, setFields] = useState({ name: "", description: "" });
  const {
    data: catalogs,
    status,
    isLoading,
    error,
  } = useQuery(["catalogs"], getAllCatalogs);

  const handleChange = (e: any) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!onValidate(fields.name)) {
      createCatalog(fields);
      setFields({ name: "", description: "" });
      queryClient.invalidateQueries();
      if (!error && !isLoading) handleModal();
    }
  };
  const onValidate = (field: string) => {
    if (field?.length < 1) return "You need to specify a name for the catalog";
    if (/\d/gi.test(field)) return "The field value should contain numbers";
    return null;
  };
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
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
            {error && `There was an error ${error}`}
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleModal}
                className={classes.cancelButton}
              >
                Cancel
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                size="small"
                onClick={handleSubmit}
              >
                Create
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormCreator;
