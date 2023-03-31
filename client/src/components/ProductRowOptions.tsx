import { IconButton, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import React, { useState } from 'react';
import PopOverList from '../components/PopOverList';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib, faRocket, faTags } from '@fortawesome/free-solid-svg-icons';

const rowOptions: { id: string; content: string; disabled?: boolean; icon: any }[] = [
   {
      id: 'enrichment',
      content: 'Enrichment',
      icon: <FontAwesomeIcon size="sm" icon={faTags} />,
   },
   {
      id: 'scribe',
      content: 'Scribe',
      icon: <FontAwesomeIcon size="sm" icon={faPenNib} />,
   },
   {
      id: 'assistant',
      content: 'Assistant',
      icon: <FontAwesomeIcon size="sm" icon={faRocket} />,
   },
];
const useStyles = makeStyles((theme) =>
   createStyles({
      typography: {
         fontWeight: 200,
      },

      alertStyle: {
         backgroundColor: theme.palette.primary.light,
         color: `${theme.palette.primary.main} !important`,
         '& .MuiAlert-icon': {
            color: theme.palette.primary.main,
         },
      },
   })
);

export default function ProductRowOptions() {
   const classes = useStyles();
   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
   const [option, setOption] = useState<any>(null);
   const openOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleOption = (id: string | null) => {
      setOption(id);
   };

   const handleClose = () => {
      setAnchorEl(null);
      setOption('');
   };

   switch (option) {
      case 'enrichment':
         alert(`There is no action associated with the ${option} function yet`);
         handleClose();
         break;
      case 'scribe':
         alert(`There is no action associated with the ${option} function yet`);
         handleClose();
         break;
      case 'assistant':
         alert(`There is no action associated with the ${option} function yet`);
         handleClose();
         break;

      default:
         break;
   }
   return (
      <>
         <IconButton size="small" onClick={openOptions} aria-label="settings">
            <MoreVertIcon />
         </IconButton>
         <PopOverList
            buttonTarget={anchorEl}
            options={rowOptions}
            setButtonTarget={setAnchorEl}
            setCurrentOption={handleOption}
         />
      </>
   );
}
