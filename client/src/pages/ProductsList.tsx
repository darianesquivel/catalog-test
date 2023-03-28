import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Button, CircularProgress, Tooltip, Typography } from '@material-ui/core';
import {
   faTags,
   faPenNib,
   faRocket,
   faTrash,
   faInfoCircle,
   faDownload,
   faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SummaryDetails from './Details/SummaryDetails';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import removeProducts from '../api/removeProducts';
import CustomDialog from '../components/CustomDialog';
import CustomAlert from '../components/CustomAlert';
import { columnsCreator, downloadCSV } from '../components/helpers';
import Lazyload from 'react-lazyload';

// STYLES
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import CustomNavBar from '../components/CustomNavBar';
import { useSingleCatalogQuery } from '../config/queries';
import NotFound from './NotFound';
import ProductCard from '../components/Cards/ProductCard';
import { useStore } from '../pages/DrawerAppbar';
import PopOverList from '../components/PopOverList';

const useStyles = makeStyles((theme) => ({
   container: {
      height: 'calc(100vh - 145px)',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr',
   },

   details: {
      display: 'grid',
      gridTemplateColumns: '3fr 1fr',
   },
   mainBox: {
      height: 'calc(100vh - 145px)',
   },
   buttonsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
   },
   startIconsGroup: {
      display: 'flex',
      // gap: theme.spacing(2),
   },
   endButtons: {
      borderRadius: theme.shape.borderRadius,
      textTransform: 'none',
      // fontSize: '14px',
      padding: theme.spacing(1.2, 0),
   },
   endIconButtons: {
      fontWeight: 500,
   },
   button: {
      display: 'flex',
      borderRadius: theme.shape.borderRadius,
   },
   typographyButtons: {
      fontSize: '14px',
      textTransform: 'initial',
      marginLeft: theme.spacing(2),
   },
   thumbnails: {
      width: '60px',
      margin: theme.spacing(0, 'auto'),
   },
   datagrid: {
      width: '100',
      fontSize: '12px',
   },
   loading: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
   },
   catalogViewContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax( 350px, 1fr))',
      gap: theme.spacing(1),
   },
   catalogViewContainerNoDate: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      [theme.breakpoints.down(1000)]: {
         gridTemplateColumns: 'repeat(auto-fit, minmax( 350px, 1fr))',
      },
      gap: theme.spacing(1),
   },
}));

const columns: GridColDef[] = [
   {
      field: 'info',
      headerName: 'Info',
      width: 30,
      renderCell: (params) => {
         return (
            <FontAwesomeIcon
               size="lg"
               icon={faInfoCircle}
               style={{ margin: '0 auto', cursor: 'pointer' }}
               color="gray"
            />
         );
      },
   },
   {
      field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => (
         <img src={params.row.image} alt="" width="80px" style={{ cursor: 'pointer' }} />
      ),
   },
   { field: 'id', headerName: 'id', width: 150 },
   { field: 'name', headerName: 'Title', width: 150 },
   { field: 'description', headerName: 'Description', width: 150 },
];
const options: { id: string; content: string; disabled: boolean; icon: any }[] = [
   {
      id: 'delete',
      content: 'Delete products',
      disabled: false,
      icon: <FontAwesomeIcon size="sm" icon={faTrash} />,
   },
   {
      id: 'enrichment',
      content: 'Enrichment',
      disabled: true,
      icon: <FontAwesomeIcon size="sm" icon={faTags} />,
   },
   {
      id: 'scribe',
      content: 'Scribe',
      disabled: true,
      icon: <FontAwesomeIcon size="sm" icon={faPenNib} />,
   },
   {
      id: 'assistant',
      content: 'Assistant',
      disabled: true,
      icon: <FontAwesomeIcon size="sm" icon={faRocket} />,
   },
];
const ProductsList = (props: any) => {
   const classes = useStyles();
   const catalogId = props.match.params.id;
   const [info, setInfo] = useState<object>();
   const [selected, setSelected] = useState<any>([]);
   const [bulkOption, setBulkOption] = useState<string | null>(null);
   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

   const isViewList = useStore((state: any) => state.isViewList);

   const {
      data: catalog = {},
      isLoading,
      isError,
      isSuccess,
      error,
      isFetching,
   } = useSingleCatalogQuery([`catalogs/:${catalogId}`, catalogId], catalogId);

   const productColumns = useMemo(
      () =>
         catalog?.products?.length
            ? columnsCreator(catalog.products.map((product: any) => product.dinamicFields))
            : columns,
      [catalog]
   );
   const products: any[] = useMemo(
      () => (catalog?.products ? catalog.products : []),
      [catalog.products]
   );
   const customColumns = [...columns, ...productColumns];
   const rows: GridRowsProp = products;
   const params: any = useParams();
   const history = useHistory();

   useEffect(() => {
      let isMounted = true;
      if (catalog.name && isMounted) {
         const initialValues = products.find((data: any) => data.id === params.productId);
         setInfo(initialValues);
         setSelected([]);
      }
      return () => {
         isMounted = false;
      };
   }, [params.productId, products, catalog.name, isViewList]);

   const handleCleanSelect = () => {
      setSelected([]);
   };

   const handleSelectAll = useCallback(() => {
      const allProducts = products.map((product) => product.id);
      setSelected(allProducts);
   }, [products]);

   const NavBar = useMemo(
      () => (
         <CustomNavBar
            title={catalog.name}
            catalogId={catalog.id}
            isProductListSection
            count={selected.length}
            onClean={handleCleanSelect}
            onSelectAll={handleSelectAll}
         />
      ),
      [catalog.name, catalog.id, selected, handleSelectAll]
   );

   const handleCheckBoxes = useCallback(
      (values: any[]) => {
         if (isViewList) {
            setSelected((prevState: any) => {
               if (prevState.includes(values)) {
                  return prevState.filter((id: any) => id !== values);
               } else {
                  return [...prevState, values];
               }
            });
         } else {
            setSelected(values);
         }
      },
      [isViewList]
   );

   const catalogRenderView = rows.map((prod) => (
      <Lazyload key={prod.id} height={100}>
         <ProductCard
            brand={prod.brand}
            title={prod.name}
            image={prod.image}
            catalogId={prod.catalogId}
            id={prod.id}
            onSelectionChange={handleCheckBoxes}
            isSelected={selected.includes(prod.id)}
         />
      </Lazyload>
   ));
   const openBulkOptinos = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setBulkOption(null);
      setAnchorEl(null);
   };

   return (
      <div className={classNames(classes.container, { [classes.details]: info })}>
         <div className={classes.mainBox}>
            {NavBar}
            <div className={classes.buttonsContainer}>
               <div className={classes.startIconsGroup}>
                  <Button
                     className={classes.button}
                     variant="contained"
                     color="primary"
                     onClick={openBulkOptinos}
                     disabled={!selected.length}
                  >
                     <FontAwesomeIcon size="lg" icon={faLayerGroup} />
                     <Typography className={classes.typographyButtons}>Bulk actions</Typography>
                  </Button>
                  <PopOverList
                     options={options}
                     buttonTarget={anchorEl}
                     setButtonTarget={setAnchorEl}
                     setCurrentOption={setBulkOption}
                  />
               </div>
               <div>
                  <Tooltip title={'Export to CSV'}>
                     <span>
                        <Button
                           className={classes.endButtons}
                           variant="outlined"
                           color="primary"
                           disabled={!products.length}
                           onClick={() => downloadCSV(products, catalog.name)}
                        >
                           <FontAwesomeIcon
                              size="sm"
                              icon={faDownload}
                              className={classes.endIconButtons}
                           />
                        </Button>
                     </span>
                  </Tooltip>
               </div>
               {bulkOption === 'delete' && (
                  <CustomDialog
                     isOpen={!!bulkOption}
                     onModalChange={handleClose}
                     onAccept={() => {
                        setSelected([]);
                        return removeProducts({ id: catalogId, productsId: selected });
                     }}
                     queryKey={[`catalogs/:${catalogId}`, catalogId]}
                     customMessage={(data: any) => data.message}
                     action="Delete"
                  >
                     <Typography variant="h6">
                        You are about to delete the selected products. Are you sure?
                     </Typography>
                     <CustomAlert
                        message="This action can't be undone."
                        alertType="error"
                        variant="filled"
                     />
                  </CustomDialog>
               )}
            </div>
            {isLoading || isFetching ? (
               <div className={classes.loading}>
                  <CircularProgress />
               </div>
            ) : null}
            {isError ? (
               <NotFound error={error} info="An error occurred while loading the catalogs" />
            ) : null}
            {isSuccess && !isFetching ? (
               isViewList ? (
                  <div
                     className={classNames(classes.catalogViewContainer, {
                        [classes.catalogViewContainerNoDate]: rows.length < 5,
                     })}
                  >
                     {catalogRenderView}
                  </div>
               ) : (
                  <DataGrid
                     className={classes.datagrid}
                     rows={rows}
                     columns={customColumns}
                     pageSize={100}
                     rowsPerPageOptions={[100]}
                     checkboxSelection
                     disableSelectionOnClick
                     onSelectionModelChange={handleCheckBoxes}
                     onCellClick={(cell: any) => {
                        if (cell.field === 'image') {
                           return history.push(`/catalogs/${catalogId}/${cell.id}/details`);
                        }
                        if (cell.field === 'info') {
                           setInfo(cell.row);
                           return history.push(`/catalogs/${catalogId}/${cell.id}/`);
                        }
                     }}
                  />
               )
            ) : null}
         </div>
         {info && <SummaryDetails {...info} closeModal={setInfo} />}
      </div>
   );
};

export default ProductsList;
