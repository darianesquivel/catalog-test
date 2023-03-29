import { Snackbar } from '@material-ui/core';
import React from 'react';
import CustomAlert from './CustomAlert';

type Tprops = {
   onClose?: () => void;
   open: boolean;
   message: string;
   alertType?: 'success' | 'error' | 'warning';
};

export default function CustomSnackBar({ onClose, message, open, alertType = 'success' }: Tprops) {
   return (
      <Snackbar
         open={open}
         autoHideDuration={2500}
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
         }}
         onClose={() => onClose?.()}
      >
         <CustomAlert alertType={alertType} message={message} />
      </Snackbar>
   );
}
