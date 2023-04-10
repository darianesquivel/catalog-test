import React, { memo, useState } from 'react';
import { faClone, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, makeStyles, Snackbar, Theme, Tooltip } from '@material-ui/core/';
import CustomAlert from './CustomAlert';

type Tprops = {
   value: string;
   children?: any;
};
const useStyles = makeStyles((theme: Theme) => ({
   childrenContainer: {
      width: '100%',
      padding: theme.spacing(1),
      display: 'flex',
      '&:hover': {
         display: 'grid',
         gridTemplateColumns: '80% 20%',
         '& > div:second-child': {
            display: 'block',
         },
      },
   },
   children: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
   },
}));

function CopyToClipBoard({ value, children }: Tprops) {
   const classes = useStyles();
   const [open, setOpen] = useState(false);
   const [showCopyBtn, setShowCopyBtn] = useState(false);
   const isLink = /http.:\/\/.{3,}\./gi.test(value);

   const handleRef = () => {
      window.open(value, '_blank');
   };
   const handleCopy = () => {
      navigator.clipboard.writeText(value);
      setOpen(true);
   };

   const RenderCopyButton = (
      <Tooltip title={'Copy value'}>
         <IconButton onClick={handleCopy}>
            <FontAwesomeIcon icon={faClone} color="black" size="2xs" />
         </IconButton>
      </Tooltip>
   );
   const RenderChildren = children ? (
      <div
         className={classes.childrenContainer}
         onMouseLeave={() => setShowCopyBtn(false)}
         onMouseEnter={() => setShowCopyBtn(true)}
      >
         <div className={classes.children}>{children}</div>
         <div>{showCopyBtn && RenderCopyButton}</div>
      </div>
   ) : (
      RenderCopyButton
   );

   return (
      <>
         {RenderChildren}
         {isLink ? (
            <IconButton onClick={handleRef}>
               <FontAwesomeIcon icon={faArrowUpRightFromSquare} color="black" size="2xs" />
            </IconButton>
         ) : null}
         <Snackbar
            open={open}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={() => setOpen(false)}
         >
            <CustomAlert title="copied" alertType="success" message="Field copied successfully" />
         </Snackbar>
      </>
   );
}
export default memo(CopyToClipBoard);
