import CustomAlert from "../Alert/CustomAlert";
import * as yup from "yup";
import CustomSnackBar from "../CustomSnackbar/CustomSnackbar";

// MUI
import { Button, CircularProgress } from "@material-ui/core";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
// FORMIK
import { useFormik } from "formik";
// HOOK
import { useMutateHook } from "../../hooks";
import queryClientConfig from "../../config/queryClientConfig";

// STYLES
import useStyles from "./styles";

type Tprops = {
  onModalChange: () => void;
  isOpen: boolean;
  apiFunction: (...params: any) => void;
  extraFn?: (data?: any) => void;
  initialValues?: {
    name: string;
    id: string;
  };
  keysToInvalidate: string[];
  acceptBtnName: string;
};

const FormCreator = ({
  onModalChange,
  isOpen,
  apiFunction,
  initialValues,
  keysToInvalidate,
  acceptBtnName,
  extraFn,
}: Tprops) => {
  const classes = useStyles();
  const stateValue = Object.keys(initialValues || {}).length
    ? initialValues
    : {
        name: "",
        id: "",
      };
  const initialName = stateValue?.name || "";
  const { mutate, error, isLoading, isSuccess } = useMutateHook(apiFunction);
  const onValidate = yup.object({
    name: yup
      .string()
      .required("You need to specify a name for the catalog")
      .max(30, "The catalog name should not be longer than 15 characters")
      .test(
        "length",
        "The field value should be different to be updated",
        (data: string) => data !== initialName
      ),
  });
  const formik = useFormik<any>({
    initialValues: stateValue,
    validationSchema: onValidate,
    onSubmit: (values) => handleSubmit(values),
  });
  const handleSubmit = async (values: any) => {
    if (!formik.errors.name) {
      mutate(values, {
        onSuccess: (data) => {
          formik.resetForm();
          queryClientConfig.invalidateQueries(keysToInvalidate);
          extraFn?.(data);
        },
      });
    }
  };

  const handleClose = async () => {
    formik.resetForm();
    onModalChange();
  };
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {isSuccess ? (
        <CustomSnackBar
          message={`The catalog was ${acceptBtnName.toLowerCase()}d successfully`}
          onClose={handleClose}
          open={isOpen}
        />
      ) : (
        isOpen && (
          <DialogContent>
            <form className={classes.container} onSubmit={formik.handleSubmit}>
              <TextField
                disabled={isLoading}
                name="name"
                autoFocus
                error={formik.touched.name && Boolean(formik.errors.name)}
                label="Catalog name"
                value={formik.values.name}
                helperText={formik.touched.name && formik.errors.name}
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {error && (
                <CustomAlert
                  alertType="error"
                  message={`There was an error creating the catalog: ${error}`}
                />
              )}
              <DialogActions>
                <Button
                  variant="contained"
                  size="small"
                  onClick={onModalChange}
                  disabled={isLoading}
                  className={classes.cancelButton}
                >
                  Cancel
                </Button>
                <div className={classes.buttonWrapper}>
                  {isLoading ? (
                    <CircularProgress
                      size={28}
                      className={classes.buttonProgress}
                    />
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => formik.handleSubmit()}
                      disabled={!formik.values.name || !!formik.errors.name}
                      className={classes.createButton}
                    >
                      {acceptBtnName}
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
