import queryClientConfig from "../../config/queryClientConfig";
import CustomAlert from "../Alert/CustomAlert";

// MUI
import { Button, CircularProgress } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import { useMutateHook } from "../../hooks";

const useStyles = makeStyles((theme: Theme) => ({
  dialog: {},
  container: {
    minWidth: "500px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "20px",
    padding: theme.spacing(2),
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

type Tprops = {
  onModalChange: () => void;
  isOpen: boolean;
  onAccept: (values?: any) => any;
  children?: any;
  queryKey?: string[];
  customMessage?: (data: any) => string;
};

const CustomDialog = ({
  onModalChange,
  isOpen,
  onAccept,
  children,
  queryKey,
  customMessage,
}: Tprops) => {
  const classes = useStyles();

  const { mutate, error, isLoading, isSuccess, data } = useMutateHook(onAccept);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    mutate();
  };

  const handleClose = async () => {
    // we don't do the invalidation in onSuccess because of the rerender of all the cards
    // which makes the success alert visible only a few microseconds
    queryClientConfig.invalidateQueries(queryKey);
    onModalChange();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.dialog}
      // fullWidth={true}
    >
      {isSuccess ? (
        <CustomAlert
          alertType="success"
          message={`${customMessage ? customMessage(data) : data}`}
          closeIcon={true}
          onClose={() => handleClose()}
        />
      ) : error ? (
        <CustomAlert
          alertType="error"
          message={`The process could not be completed because of ${
            Object(error).message
          }`}
          closeIcon={true}
          onClose={() => handleClose()}
        />
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
              {isLoading ? (
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
