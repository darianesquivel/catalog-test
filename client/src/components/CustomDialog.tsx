import CustomSnackBar from './CustomSnackbar';
import queryClientConfig from '../config/queryClientConfig';
import CustomAlert from './CustomAlert';

// MUI
import { Button, CircularProgress } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';

// STYLES
import { makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useStore } from '../pages/DrawerAppbar';
import { useDeleteProducts, useRemoveCatalog } from '../config/queries';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) => ({
   dialog: {},
   container: {
      minWidth: '500px',
      margin: theme.spacing(0, 'auto'),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: theme.spacing(3),
      padding: theme.spacing(2),
   },
   childrenBox: {},
   button: {
      borderRadius: theme.shape.borderRadius,
      textTransform: 'none',
      fontSize: '14px',
      padding: theme.spacing(0.5, 2),
      boxShadow: 'none',
      color: theme.palette.common.white,
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
   buttonError: {
      borderRadius: '8px',
      textTransform: 'none',
      fontSize: '14px',
      padding: theme.spacing(0.5, 2),
      boxShadow: 'none',
      color: theme.palette.common.white,
      backgroundColor: theme.palette.error.main,
      '&:hover': {
         boxShadow: 'none',
         backgroundColor: theme.palette.error.dark,
      },
   },
   buttonWrapper: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      minWidth: '70px',
      justifyContent: 'flex-end',
      gap: theme.spacing(2),
      margin: theme.spacing(0),
   },
   buttonProgress: {
      color: theme.palette.primary.main,
   },
   dialogActions: {},
}));

interface DialogProps {
   onModalChange: () => void;
   isOpen: boolean;
   onAccept?: () => void;
   children?: any;
   itemsInformation: {
      catalogId: string;
      catalogName?: string;
      productsId?: string[];
   };
   queryKey?: string[];
   customMessage?: (data: any) => string;
   action: 'Remove' | 'Duplicate' | 'Delete';
   extraFn?: () => void;
}
const CustomDialog = ({
   onModalChange,
   isOpen,
   onAccept = () => {},
   children,
   queryKey,
   customMessage,
   action,
   itemsInformation,
   extraFn,
}: DialogProps) => {
   const classes = useStyles();
   const history = useHistory();
   const { addCatalogsToClone, setNotifications } = useStore();

   const { catalogId, catalogName = '', productsId = [''] } = itemsInformation;
   const removeCatalog = useRemoveCatalog(catalogId);
   const deleteProducts = useDeleteProducts();

   const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      switch (action) {
         case 'Delete':
            deleteProducts.mutate(
               { catalogId, productsId },
               {
                  onSuccess: (response: any) => {
                     setNotifications({
                        type: action,
                        content: response,
                        pending: true,
                        timestamp: new Date().toISOString(),
                     });
                  },
               }
            );
            break;
         case 'Duplicate':
            //todo: add a function that executes the action regardless the section we are
            addCatalogsToClone(catalogId, catalogName);
            history.push('/catalogs');
            onModalChange();
            break;
         case 'Remove':
            removeCatalog.mutate(undefined, {
               onSuccess: (response: any) => {
                  setNotifications({
                     type: action,
                     content: response,
                     pending: true,
                     timestamp: new Date().toISOString(),
                  });
               },
            });
            break;

         default:
            break;
      }
      extraFn?.();
   };
   const handleClose = async () => {
      if (isSuccess) {
         queryClientConfig.invalidateQueries(queryKey);
         queryClientConfig.invalidateQueries(['catalogs']);
         extraFn?.();
      }
      onModalChange();
   };
   const isSuccess = removeCatalog.isSuccess || deleteProducts.isSuccess;

   const error = removeCatalog.error || deleteProducts.error;

   const isLoading = removeCatalog.isLoading || deleteProducts.isLoading;

   const data = removeCatalog.data || deleteProducts.data;

   return (
      <Dialog
         open={isOpen}
         onClose={handleClose}
         aria-labelledby="simple-modal-title"
         aria-describedby="simple-modal-description"
         className={classes.dialog}
      >
         {isSuccess ? (
            <CustomSnackBar
               message={`${customMessage ? customMessage(data) : Object(data).message}`}
               onClose={handleClose}
               open={isOpen}
            />
         ) : error ? (
            <CustomAlert
               alertType="error"
               message={`The process could not be completed because of ${Object(error).message}`}
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
                        <CircularProgress size={28} className={classes.buttonProgress} />
                     ) : (
                        <Button
                           variant="contained"
                           color="primary"
                           size="small"
                           onClick={handleSubmit}
                           className={
                              children[1]?.props?.alertType === 'error'
                                 ? classes.buttonError
                                 : classes.button
                           }
                        >
                           {action}
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
