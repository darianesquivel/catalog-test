import { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../pages/DrawerAppbar';
import { Toolbar, AppBar, Typography, IconButton, Button } from '@material-ui/core';
import SearchBar from './SearchBar';
import { faAngleLeft, faPen, faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormCreator from './FormCreator';
import updateCatalog from '../api/updateCatalog';
import queryClientConfig from '../config/queryClientConfig';
import { useMutateHook } from '../hooks';
import getFilteredCatalogs from '../api/getFilteredCatalogs';
import { useIsFetching } from '@tanstack/react-query';
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';

// STYLES
import { makeStyles, Theme } from '@material-ui/core';
import classNames from 'classnames';
import clsx from 'clsx';
import PopOverList from './PopOverList';

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
      marginLeft: theme.spacing(1),
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
   onToggle?: any;
   view?: boolean;
   count?: any;
   onClean?: any;
   onSelectAll?: any;
   saveActions?: any[];
   isUpdateLoading?: boolean;
};

export default function CustomNavBar({
   catalogId,
   title = '',
   isProductListSection = false,
   isUploadSection = false,
   isProductDetails = false,
   count,
   onClean,
   onSelectAll,
   saveActions = [],
   isUpdateLoading,
}: NavBarProps) {
   const classes = useStyles();
   const history = useHistory();
   const [open, setOpen] = useState(false);
   const [term, setTerm] = useState(getUrlTerm(history.location.search));
   const [anchorEl, setAnchorEl] = useState(null);
   const [changedValues, saveChangesFn] = saveActions;
   const isViewList = useStore((state: any) => state.isViewList);
   const { toggleView } = useStore();

   const drawerOpen = useStore((state: any) => state.open);
   const { setNotifications } = useStore();

   const { mutate, isLoading } = useMutateHook(() => getFilteredCatalogs(term));

   const isCatalogLoading = useIsFetching({
      queryKey: ['catalogs'],
   });
   const isMainSection = ![isProductDetails, isUploadSection, isProductListSection].includes(true);
   const sectionTitle = isMainSection ? 'Catalog Explorer' : title;

   const menuOptions: { id: string; content: string; disabled?: boolean }[] = [
      { id: 'selectall', content: 'Select all product' },
      { id: 'clean', content: 'Clean selected', disabled: !count },
   ];
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

   const RenderTitle = useMemo(
      () => (
         <div className={classes.sectionName}>
            <Typography variant="h6">{sectionTitle}</Typography>
         </div>
      ),
      [classes.sectionName, sectionTitle]
   );

   const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMenuOption = (id: string | null) => {
      if (!id) return;
      if (id === menuOptions[0].id) {
         onSelectAll();
      } else {
         onClean();
      }
      setAnchorEl(null);
   };

   const UpdateForm = open && catalogId && title && (
      <FormCreator
         isOpen={open}
         onModalChange={() => setOpen(false)}
         apiFunction={updateCatalog}
         initialValues={{ name: title, id: catalogId }}
         keysToInvalidate={[`catalogs/:${catalogId}`, catalogId]}
         acceptBtnName="Update"
         extraFn={(data) => {
            setNotifications({
               type: 'Update',
               content: data,
               timestamp: new Date().toISOString(),
            });
         }}
      />
   );
   const ArrowIcon =
      !isMainSection && title ? (
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
      ) : null;

   const RefreshIcon = isMainSection ? (
      <IconButton
         color={`${!isCatalogLoading ? 'primary' : 'default'}`}
         className={classNames(classes.icons, {
            [classes.rotate]: isCatalogLoading,
         })}
         onClick={handleRefresh}
      >
         <FontAwesomeIcon icon={faRedo} size="sm" />
      </IconButton>
   ) : null;

   const EditIcon =
      isProductListSection && title ? (
         <IconButton className={classes.icons} onClick={() => setOpen(true)}>
            <FontAwesomeIcon icon={faPen} size="xs" />
         </IconButton>
      ) : null;

   const FinalIcons =
      isProductListSection && title ? (
         <>
            {!isViewList ? (
               <div>
                  <Button
                     variant="outlined"
                     color="primary"
                     className={classes.addProductBtn}
                     onClick={handleClick}
                  >
                     {`${count} selected`}
                  </Button>
                  <PopOverList
                     options={menuOptions}
                     buttonTarget={anchorEl}
                     setCurrentOption={handleMenuOption}
                     setButtonTarget={setAnchorEl}
                  />
               </div>
            ) : null}
            <Button
               onClick={toggleView}
               variant="outlined"
               color="primary"
               className={classes.addProductBtn}
            >
               {!isViewList ? (
                  <>
                     <FontAwesomeIcon size="lg" icon={faThList} />
                  </>
               ) : (
                  <FontAwesomeIcon size="lg" icon={faThLarge} />
               )}
            </Button>
            <Button
               variant="outlined"
               color="primary"
               onClick={() => history.push(`/catalogs/${catalogId}/upload`)}
               className={classes.addProductBtn}
            >
               Add products
            </Button>
            {changedValues?.length ? (
               <Button
                  variant="contained"
                  color="primary"
                  className={classes.addProductBtn}
                  onClick={saveChangesFn}
                  disabled={isUpdateLoading}
               >
                  {isUpdateLoading ? 'Saving changes...' : `Save ${changedValues?.length} changes`}
               </Button>
            ) : null}
         </>
      ) : isMainSection && !isProductListSection && !isProductDetails ? (
         <SearchBar
            onSubmit={handleSearchSubmit}
            initialTerm={term}
            onChange={handleSearchChange}
            searching={!!isLoading}
         />
      ) : null;

   return (
      <div>
         {UpdateForm}
         <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
               [classes.appBarShift]: drawerOpen,
            })}
         >
            <Toolbar className={classes.toolbar} disableGutters={true}>
               <div className={classes.mainContent}>
                  {ArrowIcon}
                  {RenderTitle}
                  {RefreshIcon}
                  {EditIcon}
               </div>
               <div className={classes.endSection}>{FinalIcons}</div>
            </Toolbar>
         </AppBar>
      </div>
   );
}
