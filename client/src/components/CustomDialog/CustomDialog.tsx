import { useEffect, useState } from "react";
import queryClientConfig from "../../ReactQuery/queryClientConfig";
import CustomAlert from "../Alert/CustomAlert";

// API
// MUI
import { Button, CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  dialog: {},
  container: {
    width: "500px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px !important",
    justifyContent: "space-evenly",
    gap: "20px",
  },
  childrenBox: {},
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
    width: "100%",
    display: "flex",
    alignItems: "center",
    minWidth: "70px",
    justifyContent: "flex-end",
    gap: "10px",
    margin: 0,
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
  handleAccept: (values?: any) => void;
  children?: any;
  queryKey?: string;
};

const CustomDialog = ({
  handleModal,
  isOpen,
  handleAccept,
  children,
  queryKey,
}: Tprops) => {
  const classes = useStyles();
  const [error, setError] = useState<any>("");
  const [submiting, setSubmiting] = useState(false);
  const [successed, setSuccessed] = useState<any>(false);
  // Este dialogo debe renderizar los childrens opcionalmente, sea un form, un texto o un error
  // para el sucsess o el error podrá reutilizar el componente de alert
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      setSubmiting(true);
      const res = await handleAccept();
      setSubmiting(false);
      setSuccessed(res);
    } catch (err: any) {
      setError(err);
      setSubmiting(false);
    }
  };

  const handleClose = async () => {
    await queryClientConfig.invalidateQueries([`${queryKey}`]);
    handleModal();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.dialog}
    >
      {successed ? (
        <CustomAlert alertType="success" message={successed} />
      ) : error ? (
        <CustomAlert alertType="error" message={error.message} />
      ) : (
        <DialogContent className={classes.container}>
          {children && children}

          <DialogActions>
            <div className={classes.buttonWrapper}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleClose}
                className={classes.cancelButton}
              >
                Cancel
              </Button>
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
                  Accept
                </Button>
              )}
            </div>
          </DialogActions>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default CustomDialog;
