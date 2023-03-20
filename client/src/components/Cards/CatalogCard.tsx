import { useState } from 'react';
import {
   CardContent,
   Typography,
   Popover,
   Card,
   CardHeader,
   CardMedia,
   IconButton,
   MenuItem,
   MenuList,
} from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { faCartPlus, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import CustomAlert from '../CustomAlert';
import CustomDialog from '../CustomDialog';
import FormCreator from '../FormCreator';
import updateCatalog from '../../api/updateCatalog';
import removeCatalog from '../../api/removeCatalog';
import clonedCatalog from '../../api/cloneCatalog';

// STYLES
import { makeStyles, createStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React from 'react';

const useStyles = makeStyles((theme) =>
   createStyles({
      root: {
         '& .MuiCardContent-root': {
            paddingBottom: theme.spacing(1.5),
         },
      },
      catalogCard: {
         height: 355,
         borderRadius: theme.shape.borderRadius,
      },
      cardContainer: {
         width: '100%',
         height: '100%',
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'space-between',
         padding: theme.spacing(0),
      },
      media: {
         height: 300,
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
         color: theme.palette.primary.main,
         gap: theme.spacing(1),
         cursor: 'pointer',
      },
      typography: {
         fontWeight: 200,
      },
      products: {
         color: theme.palette.primary.main,
         fontSize: '15px',
         marginBottom: theme.spacing(1),
         cursor: 'pointer',
      },
      createdAt: {
         display: 'flex',
         alignItems: 'center',
         color: theme.palette.grey[500],
         fontSize: '14px',
         gap: theme.spacing(1),
         letterSpacing: '0.04em',
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

// the below type we should reuse in Catalog Explorer
type TcatalogCard = {
   id: string;
   name: string;
   products?: any;
   createdAt?: string;
   image?: string;
   productCount: number;
};

export default function CatalogCard({ id, name, products, createdAt, productCount }: TcatalogCard) {
   const classes = useStyles();
   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
   const [option, setOption] = useState<string>('');
   const history = useHistory();

   const openOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
      setOption('');
   };

   const handleOption = (event: any) => {
      const eventName = event.target.id;
      setOption(eventName);
   };
   const date = createdAt ? new Date(createdAt).toLocaleString() : 'no date';
   const defaultImage = products?.[0]?.image;

   const menuOpen = Boolean(anchorEl);
   const targetId = menuOpen ? 'simple-popover' : undefined;
   const renderDialog =
      option === 'edit' ? (
         <FormCreator
            onModalChange={handleClose}
            isOpen={true}
            apiFunction={updateCatalog}
            initialValues={{ id, name }}
            keysToInvalidate={['catalogs']}
            acceptBtnName="Update"
         />
      ) : option === 'remove' ? (
         <CustomDialog
            isOpen={Boolean(option)}
            onModalChange={handleClose}
            onAccept={() => removeCatalog({ id })}
            queryKey={['catalogs']}
            action="Remove"
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
      ) : option === 'duplicate' ? (
         <CustomDialog
            isOpen={Boolean(option)}
            onModalChange={handleClose}
            onAccept={() => clonedCatalog(id)}
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
      ) : null;
   return (
      <>
         <Card className={classNames(classes.catalogCard, classes.root)}>
            <CardContent className={classes.cardContainer}>
               <CardHeader
                  action={
                     <>
                        <IconButton onClick={openOptions} aria-label="settings">
                           <MoreVertIcon />
                        </IconButton>
                        <Popover
                           id={targetId}
                           open={menuOpen}
                           anchorEl={anchorEl}
                           onClose={handleClose}
                           anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                           }}
                           transformOrigin={{
                              vertical: 'top',
                              horizontal: 'center',
                           }}
                        >
                           <MenuList>
                              <MenuItem onClick={handleOption} id="edit">
                                 Edit catalog
                              </MenuItem>
                              <MenuItem id="duplicate" onClick={handleOption}>
                                 Duplicate catalog
                              </MenuItem>
                              <MenuItem onClick={handleOption} id="remove">
                                 Remove catalog
                              </MenuItem>
                           </MenuList>
                        </Popover>
                     </>
                  }
                  title={name ? name : 'Default'}
                  titleTypographyProps={{ variant: 'body2' }}
               />

               {productCount < 1 ? (
                  <CardMedia
                     onClick={() => history.push(`/catalogs/${id}/upload`)}
                     className={classes.media}
                     children={
                        <>
                           <FontAwesomeIcon size="2xl" icon={faCartPlus} />
                           <Typography variant="body2" className={classes.typography}>
                              Add Products
                           </Typography>
                        </>
                     }
                  ></CardMedia>
               ) : (
                  defaultImage && (
                     <CardMedia
                        className={classes.media}
                        onClick={() => history.push(`/catalogs/${id}`)}
                        image={defaultImage}
                     />
                  )
               )}
               <CardContent>
                  <Typography
                     className={classes.products}
                     onClick={() => history.push(`/catalogs/${id}`)}
                  >{`${productCount > 1 ? productCount : 0} products`}</Typography>
                  <Typography className={classes.createdAt} variant="body2">
                     <FontAwesomeIcon size="1x" icon={faCalendarDay} />
                     {`Created: ${date}`}
                  </Typography>
               </CardContent>
            </CardContent>
         </Card>
         {renderDialog}
      </>
   );
}
