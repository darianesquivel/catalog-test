import { Snackbar } from '@material-ui/core';
import React from 'react';
import CustomAlert from './CustomAlert';

type Tprops = {
   onClose: () => void;
   open: boolean;
   message: string;
};

export default function CustomSnackBar({ onClose, message, open }: Tprops) {
   return (
      <Snackbar
         open={open}
         autoHideDuration={1500}
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
         }}
         onClose={() => onClose()}
      >
         <CustomAlert alertType={'success'} message={message} />
      </Snackbar>
   );
}
