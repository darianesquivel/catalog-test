import { useCallback, useState } from 'react';
import { Toolbar, AppBar, Typography, IconButton, Button } from '@material-ui/core';
import { faAngleLeft, faPen, faRedo } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { useStore } from '../pages/DrawerAppbar';
import FormCreator from './FormCreator';
import updateCatalog from '../api/updateCatalog';
import queryClientConfig from '../config/queryClientConfig';
import SearchBar from './SearchBar';
import { useMutateHook } from '../hooks';
import getFilteredCatalogs from '../api/getFilteredCatalogs';
import { useIsFetching } from '@tanstack/react-query';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const drawerWidth = 240;
const drawerWidthMin = 70;

const useStyles = makeStyles((theme: Theme) => ({
   mainContainer: { height: '65px' },
   toolbar: {
      width: '100%',
      display: 'grid',
      justifyContent: 'space-between',
      gridTemplateColumns: '1fr 1fr',
   },
   mainContent: {
      display: 'flex',
      justifyContent: 'start',
      padding: theme.spacing(1),
      gap: theme.spacing(1),
      marginLeft: theme.spacing(2),
   },
   addProductBtn: {
      borderRadius: theme.shape.borderRadius,
      textTransform: 'none',
      padding: theme.spacing(0.3, 2),
   },
   icons: {
      width: '45px',
   },
   sectionName: {
      minWidth: '45px',
      display: 'flex',
      alignItems: 'center',
   },
   endSection: {
      display: 'flex',
      justifyContent: 'end',
      paddingRight: theme.spacing(2),
   },
   rotate: {
      animation: '$spin 1s linear infinite',
   },
   '@keyframes spin': {
      '0%': {
         transform: 'rotate(0deg)',
      },
      '100%': {
         transform: 'rotate(360deg)',
      },
   },
   appBar: {
      boxShadow: 'none',
      borderBottom: `${theme.spacing(1) / 8}px solid ${theme.palette.action.focus}`,
      zIndex: theme.zIndex.drawer - 1,
      width: `calc(100% - ${drawerWidthMin}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.getContrastText(theme.palette.background.paper),
   },
   appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   },
}));
const getUrlTerm = (url: string) => url?.match(/(?<=term=).+/gi)?.[0];

type NavBarProps = {
   catalogId?: string;
   productId?: string;
   title?: string;
   isProductListSection?: boolean;
   isUploadSection?: boolean;
   isProductDetails?: boolean;
};
export default function CustomNavBar({
   catalogId,
   title,
   productId,
   isProductListSection = false,
   isUploadSection = false,
   isProductDetails = false,
}: NavBarProps) {
   const classes = useStyles();

   const history = useHistory();

   const [open, setOpen] = useState(false);
   const [term, setTerm] = useState(getUrlTerm(history.location.search));

   const drawerOpen = useStore((state: any) => state.open);

   const { mutate, isLoading } = useMutateHook(() => getFilteredCatalogs(term));

   const isCatalogLoading = useIsFetching({
      queryKey: ['catalogs'],
   });

   const sectionTitle = title ? title : 'Catalog Explorer';

   const isMainSection = sectionTitle.includes('Catalog Explorer');

   const handleRefresh = async () => {
      queryClientConfig.invalidateQueries(['catalogs']);
      setTerm('');
   };

   const handleSearchSubmit = useCallback(
      (updatedTerm: string | undefined) => {
         if (updatedTerm) {
            history.push({
               pathname: '/catalogs',
               search: `?term=${updatedTerm}`,
            });
            mutate(undefined, {
               onSuccess: (data: any) => queryClientConfig.setQueryData(['catalogs'], data),
               onError: (err) => {
                  queryClientConfig.clear();
               },
            });
         } else {
            setTerm('');
            queryClientConfig.invalidateQueries(['catalogs']);
            history.push('/catalogs');
         }
      },
      [history, mutate]
   );

   const handleSearchChange = (value: string) => {
      setTerm(value);
   };

   return (
      <div>
         {open && catalogId && title && (
            <FormCreator
               isOpen={open}
               onModalChange={() => setOpen(false)}
               apiFunction={updateCatalog}
               initialValues={{ name: title, id: catalogId }}
               keysToInvalidate={[`catalogs/:${catalogId}`, catalogId]}
               acceptBtnName="Update"
            />
         )}
         <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
               [classes.appBarShift]: drawerOpen,
            })}
         >
            <Toolbar className={classes.toolbar} disableGutters={true}>
               <div className={classes.mainContent}>
                  {!isMainSection ? (
                     <IconButton
                        className={classes.icons}
                        onClick={() => {
                           if (isProductDetails || isUploadSection) {
                              history.goBack();
                           } else {
                              history.push('/catalogs');
                           }
                        }}
                     >
                        <FontAwesomeIcon icon={faAngleLeft} size="sm" />
                     </IconButton>
                  ) : null}

                  <div className={classes.sectionName}>
                     <Typography variant="h6">{sectionTitle}</Typography>
                  </div>

                  {isMainSection ? (
                     <IconButton
                        color={`${!isCatalogLoading ? 'primary' : 'default'}`}
                        className={`${classes.icons} ${isCatalogLoading ? classes.rotate : ''}`}
                        onClick={handleRefresh}
                     >
                        <FontAwesomeIcon icon={faRedo} size="sm" />
                     </IconButton>
                  ) : null}
                  {isProductListSection && !isProductDetails && !isUploadSection ? (
                     <IconButton className={classes.icons} onClick={() => setOpen(true)}>
                        <FontAwesomeIcon icon={faPen} size="xs" />
                     </IconButton>
                  ) : null}
               </div>

               <div className={classes.endSection}>
                  {isProductListSection && !isProductDetails && !isUploadSection ? (
                     <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => history.push(`/catalogs/${catalogId}/upload`)}
                        className={classes.addProductBtn}
                     >
                        Add products
                     </Button>
                  ) : isMainSection ? (
                     <SearchBar
                        onSubmit={handleSearchSubmit}
                        initialTerm={term}
                        onChange={handleSearchChange}
                        searching={!!isLoading}
                     />
                  ) : null}
               </div>
            </Toolbar>
         </AppBar>
      </div>
   );
}
