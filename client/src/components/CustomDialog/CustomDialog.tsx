import queryClientConfig from "../../config/queryClientConfig";
import CustomAlert from "../Alert/CustomAlert";

// MUI
import { Button, CircularProgress } from "@material-ui/core";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import { useMutateHook } from "../../hooks";

//STYLES
import useStyles from "./styles";

type Tprops = {
  handleModal: () => void;
  isOpen: boolean;
  handleAccept: (values?: any) => any;
  children?: any;
  queryKey?: string[];
};

const CustomDialog = ({
  handleModal,
  isOpen,
  handleAccept,
  children,
  queryKey,
}: Tprops) => {
  const classes = useStyles();

  const { mutate, error, isLoading, isSuccess, data } =
    useMutateHook(handleAccept);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    mutate();
  };

  const handleClose = async () => {
    // we don't do the invalidation in onSuccess because of the rerender of all the cards
    // which makes the success alert visible only a few microseconds
    queryClientConfig.invalidateQueries(queryKey);
    handleModal();
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
          message={`${data}`}
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
