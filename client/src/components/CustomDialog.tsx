import CustomSnackBar from './CustomSnackbar';
import queryClientConfig from '../config/queryClientConfig';
import CustomAlert from './CustomAlert';

// MUI
import { Button, CircularProgress } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { useMutateHook } from '../hooks';

// STYLES
import { makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useStore } from '../pages/DrawerAppbar';

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

type Tprops = {
   onModalChange: () => void;
   isOpen: boolean;
   onAccept: () => void;
   children?: any;
   queryKey?: string[];
   customMessage?: (data: any) => string;
   action: 'Update' | 'Remove' | 'Duplicate' | 'Delete';
};
const CustomDialog = ({
   onModalChange,
   isOpen,
   onAccept,
   children,
   queryKey,
   customMessage,
   action,
}: Tprops) => {
   const classes = useStyles();

   const { mutate, error, isLoading, isSuccess, data } = useMutateHook(onAccept);
   const { setNotifications } = useStore();

   const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      mutate(undefined, {
         onSuccess: (responseMessage: any) => {
            const content =
               responseMessage instanceof Object
                  ? `Removed Products: ${responseMessage.removedProducts}`
                  : responseMessage;
            setNotifications({
               type: action,
               content,
               pending: true,
               timestamp: new Date().toISOString(),
            });
            queryClientConfig.invalidateQueries(queryKey);
         },
      });
   };
   const handleClose = async () => {
      // we don't do the invalidation in onSuccess because of the rerender of all the cards
      // which makes the success alert visible only a few microseconds
      // queryClientConfig.invalidateQueries(queryKey);
      // MAKE A VIDEO OF THIS ISSUE
      onModalChange();
   };

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
               message={`${customMessage ? customMessage(data) : data}`}
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
