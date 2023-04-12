import { IconButton, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import React, { useState } from 'react';
import removeCatalog from '../../api/removeCatalog';
import updateCatalog from '../../api/updateCatalog';
import { useCopyToClipboard } from '../../hooks';
import { useStore } from '../../pages/DrawerAppbar';
import CustomAlert from '../CustomAlert';
import CustomDialog from '../CustomDialog';
import FormCreator from '../FormCreator';
import PopOverList from '../PopOverList';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CustomSnackBar from '../CustomSnackbar';
import { useHistory } from 'react-router';

const catalogOptions: { id: string; content: string; optionDesc?: string }[] = [
   { id: 'edit', content: 'Edit catalog', optionDesc: 'Edit the catalog name' },
   {
      id: 'duplicate',
      content: 'Duplicate catalog',
      optionDesc: 'Duplicate the current catalog and all its products',
   },
   {
      id: 'copy link',
      content: 'Copy upload link',
      optionDesc: 'Copy the catalog link to upload products',
   },
   { id: 'copy key', content: 'Copy catalog key', optionDesc: 'Copy the catalog id' },
   {
      id: 'remove',
      content: 'Remove catalog',
      optionDesc: 'Delete the catalog and all its content permanently',
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
type OptionProps = {
   name: string;
   id: string;
};
export default function CatalogOptions({ name, id }: OptionProps) {
   const classes = useStyles();
   const history = useHistory();
   const { setNotifications } = useStore();
   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
   const [option, setOption] = useState<any>(null);
   const [snackMessage, setSnackMessage] = useState('');
   const [isCopied, copyToClipboardFn] = useCopyToClipboard();
   const openOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
      setOption('');
   };

   const handleOption = (id: string | null) => {
      setOption(id);
   };
   let RenderSnackBar = (
      <CustomSnackBar
         message={snackMessage}
         open={isCopied}
         alertType="success"
         onClose={handleClose}
      />
   );
   let renderDialog: any = null;

   switch (option) {
      case 'edit':
         renderDialog = (
            <FormCreator
               onModalChange={handleClose}
               isOpen={true}
               apiFunction={updateCatalog}
               initialValues={{ id, name }}
               keysToInvalidate={[`catalogs/:${id}`, id]}
               action="Update"
               extraFn={(data: any) => {
                  setNotifications({
                     type: 'Update',
                     content: data,
                     timestamp: new Date().toISOString(),
                  });
               }}
            />
         );
         break;
      case 'remove':
         renderDialog = (
            <CustomDialog
               isOpen={Boolean(option)}
               onModalChange={handleClose}
               onAccept={() => removeCatalog(id)}
               itemsInformation={{ catalogId: id }}
               queryKey={[`catalogs/:${id}`, id]}
               action="Remove"
               extraFn={() => history.push('/catalogs')}
            >
               <Typography variant="h6">
                  You are about to delete the catalog "<b>{name}</b>". Are you sure?
               </Typography>
               <CustomAlert
                  message="This action can't be undone."
                  alertType="error"
                  variant="filled"
               />
            </CustomDialog>
         );
         break;
      case 'duplicate':
         renderDialog = (
            <CustomDialog
               isOpen={Boolean(option)}
               onModalChange={handleClose}
               itemsInformation={{ catalogId: id, catalogName: name }}
               queryKey={['catalogs']}
               action="Duplicate"
            >
               <Typography variant="h6">
                  You are about to duplicate the catalog "<b>{name}</b>". Are you sure?
               </Typography>
               <CustomAlert
                  message="The catalog and all its products will be duplicated"
                  alertType="info"
                  variant="standard"
                  propClassName={classes.alertStyle}
               />
            </CustomDialog>
         );
         break;
      case 'copy link':
         const uploadUrl = `${window.location.origin}/catalogs/${id}/upload`;
         copyToClipboardFn(uploadUrl).then(() => {
            setSnackMessage('Catalog upload products link copied successfully');
            handleClose();
         });
         break;
      case 'copy key':
         copyToClipboardFn(id).then(() => {
            setSnackMessage('Catalog key copied successfully');
            handleClose();
         });
         break;

      default:
         break;
   }
   return (
      <>
         <IconButton onClick={openOptions} aria-label="settings">
            <MoreVertIcon />
         </IconButton>
         <PopOverList
            buttonTarget={anchorEl}
            options={catalogOptions}
            setButtonTarget={setAnchorEl}
            setCurrentOption={handleOption}
         />
         {renderDialog}
         {RenderSnackBar}
      </>
   );
}
