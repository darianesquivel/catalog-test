import React, { useEffect, useState } from 'react';

import {
   CardContent,
   Typography,
   Card,
   CardHeader,
   Dialog,
   DialogContent,
} from '@material-ui/core';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// STYLES
import { makeStyles, createStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { useMutateHook } from '../../hooks';
import clonedCatalog from '../../api/cloneCatalog';
import { useStore } from '../../pages/DrawerAppbar';
import queryClientConfig from '../../config/queryClientConfig';
import CustomAlert from '../CustomAlert';

const useStyles = makeStyles((theme) =>
   createStyles({
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
      icons: {
         fontSize: theme.spacing(3.6),
         color: theme.palette.primary.main,
      },
      centerContent: {
         display: 'flex',
         flexFlow: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         gap: theme.spacing(1),
         height: '100%',
         marginBottom: theme.spacing(3),
      },
      rotate: {
         animation: '$spin 2s linear infinite',
      },
      '@keyframes spin': {
         '0%': {
            transform: 'rotate(0deg)',
         },
         '100%': {
            transform: 'rotate(360deg)',
         },
      },
      mainDialogBox: {
         '& .MuiDialogContent-root': {
            padding: '0',
         },
      },
   })
);
interface CardProps {
   catalogId: string;
   title: string;
}

export default function CloningCard({ catalogId, title }: CardProps) {
   const classes = useStyles();
   const [openAlert, setOpenAlert] = useState(false);
   const { removeCatalogToClone, setNotifications } = useStore();
   const { mutate, error, isError } = useMutateHook(() => clonedCatalog(catalogId));

   const handleCloseAlert = () => {
      setOpenAlert(false);
      removeCatalogToClone(catalogId);
   };

   useEffect(() => {
      let isMounted = true;
      let timeoutId: any;
      if (isMounted) {
         mutate(undefined, {
            onSuccess: (newCatalog: any) => {
               removeCatalogToClone(catalogId);
               setNotifications({
                  type: 'Upload',
                  content: newCatalog,
                  timestamp: new Date().toISOString(),
                  pending: true,
               });
               queryClientConfig.invalidateQueries(['catalogs']);
            },
            onError: (err) => {
               setOpenAlert(true);
               timeoutId = setTimeout(() => {
                  removeCatalogToClone(catalogId);
               }, 6000);
            },
         });
      }

      return () => {
         isMounted = false;
         clearTimeout(timeoutId);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <>
         <Card className={classNames(classes.catalogCard)}>
            <CardContent className={classes.cardContainer}>
               <CardHeader title={`${title} (copy)`} titleTypographyProps={{ variant: 'body2' }} />
               <CardContent className={classes.centerContent}>
                  <FontAwesomeIcon
                     icon={faRedo}
                     size="lg"
                     className={classNames(classes.icons, { [classes.rotate]: !openAlert })}
                     color="primary"
                  />
                  <Typography variant="body2" color="primary">
                     Duplicating Catalog...
                  </Typography>
               </CardContent>
            </CardContent>
         </Card>
         {isError && openAlert && (
            <Dialog open={true} className={classes.mainDialogBox}>
               <DialogContent>
                  <CustomAlert
                     alertType="error"
                     message={`The process could not be completed because of ${
                        Object(error).message
                     }`}
                     closeIcon={true}
                     onClose={handleCloseAlert}
                  />
               </DialogContent>
            </Dialog>
         )}
      </>
   );
}
