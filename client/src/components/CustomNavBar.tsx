import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../pages/DrawerAppbar';
import { Toolbar, AppBar, Typography, IconButton, Button } from '@material-ui/core';
import SearchBar from './SearchBar';
import { faAngleLeft, faPen, faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { shallow } from 'zustand/shallow';
import FormCreator from './FormCreator';
import updateCatalog from '../api/updateCatalog';
import queryClientConfig from '../config/queryClientConfig';
import { useMutateHook } from '../hooks';
import getFilteredCatalogs from '../api/getFilteredCatalogs';
import { useIsFetching } from '@tanstack/react-query';

// STYLES
import { makeStyles, Theme } from '@material-ui/core';
import classNames from 'classnames';
import clsx from 'clsx';

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

export default function CustomNavBar() {
   const classes = useStyles();
   const getUrlTerm = useCallback((url: string) => url?.match(/(?<=term=).+/gi)?.[0], []);
   const history = useHistory();

   const [open, setOpen] = useState(false);
   const [term, setTerm] = useState('');
   const drawerOpen = useStore((state: any) => state.open);

   const { currentUrl, sectionInfo } = useStore(
      (state: any) => ({
         currentUrl: state.currentUrl,
         sectionInfo: state.sectionInfo,
      }),
      shallow
   );
   const { setCurrentUrl, setSearchingData, setSectionInfo } = useStore();

   const { id, name } = sectionInfo || {};

   const { mutate, isLoading } = useMutateHook(() => getFilteredCatalogs(term));

   const isCatalogLoading = useIsFetching({
      queryKey: ['catalogs'],
   });

   const isProductListView = /catalogs\/.+/gi.test(currentUrl);
   const isUpload = /\/upload$/gi.test(currentUrl);
   const isDetails = /\/details$/gi.test(currentUrl);
   const sectionTitle = isUpload ? 'Catalog upload' : name ? name : 'Catalog Explorer';

   const isMainSection = sectionTitle.includes('Catalog Explorer');
   // We cannot use params here because this component is outer react router
   const catalogId = useMemo(
      () =>
         currentUrl.match(/(?<=catalogs\/)(.+?)(?=\/)/)?.[0] ||
         currentUrl.match(/(?<=catalogs\/).+/)?.[0],
      [currentUrl]
   );

   const handleRefresh = async () => {
      queryClientConfig.invalidateQueries(['catalogs']);
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
            history.push('/catalogs');
            queryClientConfig.invalidateQueries(['catalogs']);
         }
      },
      [history, mutate]
   );

   const handleSearchChange = (value: string) => {
      setTerm(value);
   };

   useEffect(() => {
      setSearchingData({ isSearching: isLoading });
      const searchValue: string = getUrlTerm(history.location.search) || '';
      setTerm(searchValue);
      history.listen((props) => {
         const { pathname, search } = props || {};
         setTerm(getUrlTerm(search) || '');
         setCurrentUrl(pathname + search);
      });
   }, [history, setCurrentUrl, getUrlTerm, isLoading, setSearchingData]);

   return (
      <div>
         {open && (
            <FormCreator
               isOpen={open}
               onModalChange={() => setOpen(false)}
               apiFunction={updateCatalog}
               initialValues={{ name, id }}
               keysToInvalidate={[`catalogs/:${catalogId}`, catalogId]}
               acceptBtnName="Update"
               extraFn={(data) => {
                  const { name, id } = data || {};
                  if (name) setSectionInfo(name, id);
               }}
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
                  {isProductListView || isUpload ? (
                     <IconButton
                        className={classes.icons}
                        onClick={() => {
                           if (isDetails || isUpload) history.goBack();
                           else history.push('/catalogs');
                        }}
                     >
                        <FontAwesomeIcon icon={faAngleLeft} size="sm" />
                     </IconButton>
                  ) : null}

                  <div className={classes.sectionName}>
                     <Typography variant="h6">{sectionTitle}</Typography>
                  </div>

                  {isMainSection && !isDetails ? (
                     <IconButton
                        color={`${!isCatalogLoading ? 'primary' : 'default'}`}
                        className={classNames(classes.icons, {
                           [classes.rotate]: isCatalogLoading,
                        })}
                        onClick={handleRefresh}
                     >
                        <FontAwesomeIcon icon={faRedo} size="sm" />
                     </IconButton>
                  ) : null}
                  {isProductListView && !isDetails && !isUpload ? (
                     <IconButton className={classes.icons} onClick={() => setOpen(true)}>
                        <FontAwesomeIcon icon={faPen} size="xs" />
                     </IconButton>
                  ) : null}
               </div>

               <div className={classes.endSection}>
                  {isProductListView && !isDetails && !isUpload ? (
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
