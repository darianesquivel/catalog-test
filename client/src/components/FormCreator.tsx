import CustomAlert from './CustomAlert';
import * as yup from 'yup';
import CustomSnackBar from './CustomSnackbar';

// MUI
import { Button, CircularProgress } from '@material-ui/core';
import { TextField, Dialog, DialogActions, DialogContent } from '@material-ui/core';
// FORMIK
import { useFormik } from 'formik';
// HOOK
import queryClientConfig from '../config/queryClientConfig';

// STYLES
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useCreateCatalog, useUpdateCatalog } from '../config/queries';

const useStyles = makeStyles((theme) => ({
   container: {
      minWidth: '500px',
      display: 'flex',
      margin: theme.spacing(0, 'auto'),
      padding: theme.spacing(3),
      flexFlow: 'column',
      gap: '20px',
   },
   createButton: {
      borderRadius: '8px',
      textTransform: 'none',
      fontSize: '14px',
      padding: theme.spacing(0.5, 2),
      boxShadow: 'none',
      '&:hover': {
         boxShadow: 'none',
         backgroundColor: theme.palette.primary.light,
      },
   },
   cancelButton: {
      borderRadius: '8px',
      textTransform: 'none',
      fontSize: '14px',
      padding: theme.spacing(0.5, 2),
      backgroundColor: theme.palette.background.paper,
      border: `0.5px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
      boxShadow: 'none',
      '&:hover': {
         boxShadow: `inset 0 0 0 0.5px ${theme.palette.primary.main}`,
         backgroundColor: theme.palette.background.paper,
      },
   },
   buttonWrapper: {
      minWidth: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
   },
   buttonProgress: {
      color: theme.palette.grey[500],
   },
}));

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
   action: 'Create' | 'Update';
};

const FormCreator = ({
   onModalChange,
   isOpen,
   initialValues = { name: '', id: '' },
   keysToInvalidate,
   action,
   extraFn,
}: Tprops) => {
   const classes = useStyles();

   const initialName = initialValues.name;

   const createCatalog = useCreateCatalog();
   const updateCatalog = useUpdateCatalog();

   const isSuccess = createCatalog.isSuccess || updateCatalog.isSuccess;

   const error = createCatalog.error || updateCatalog.error;

   const isLoading = createCatalog.isLoading || updateCatalog.isLoading;

   const onValidate = yup.object({
      name: yup
         .string()
         .required('You need to specify a name for the catalog')
         .max(30, 'The catalog name should not be longer than 15 characters')
         .test(
            'length',
            'The field value should be different to be updated',
            (data: string) => data !== initialName
         ),
   });
   const formik = useFormik<any>({
      initialValues,
      validationSchema: onValidate,
      onSubmit: (values) => handleSubmit(values),
   });
   const handleSubmit = async (values: { name: string }) => {
      if (!formik.errors.name) {
         const { name } = values;
         switch (action) {
            case 'Create':
               createCatalog.mutate(name, {
                  onSuccess: (data) => {
                     formik.resetForm();
                     extraFn?.(data);
                  },
               });
               break;
            case 'Update':
               updateCatalog.mutate(
                  { catalogId: initialValues.id, catalogName: name },
                  {
                     onSuccess: (data) => {
                        queryClientConfig.invalidateQueries(keysToInvalidate);
                        queryClientConfig.invalidateQueries(['catalogs']);
                        extraFn?.(data);
                     },
                  }
               );
               break;
            default:
               break;
         }
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
               message={`The catalog was ${action.toLowerCase()}d successfully`}
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
                              <CircularProgress size={28} className={classes.buttonProgress} />
                           ) : (
                              <Button
                                 variant="contained"
                                 color="primary"
                                 size="small"
                                 onClick={() => formik.handleSubmit()}
                                 disabled={!formik.values.name || !!formik.errors.name}
                                 className={classes.createButton}
                              >
                                 {action}
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
