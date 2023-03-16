import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import {
   faTags,
   faPenNib,
   faRocket,
   faTrash,
   faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SummaryDetails from './Details/SummaryDetails';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useStore } from './DrawerAppbar';
import { useHistory, useParams } from 'react-router';

import removeProducts from '../api/removeProducts';
import CustomDialog from '../components/CustomDialog';
import CustomAlert from '../components/CustomAlert';
import { columnsCreator } from '../components/helpers';

// STYLES
import { makeStyles } from '@material-ui/core/styles';
import CustomNavBar from '../components/CustomNavBar';
import { useSingleCatalogQuery } from '../config/queries';
import React from 'react';

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
      gap: theme.spacing(2),
      marginBottom: theme.spacing(2),
   },
   button: {
      display: 'flex',
      borderRadius: theme.shape.borderRadius,
   },
   typographyButtons: {
      fontSize: '15px',
      textTransform: 'capitalize',
      marginLeft: theme.spacing(2),
   },
   thumbnails: {
      width: '60px',
      margin: theme.spacing(0, 'auto'),
   },
   datagrid: {
      width: '100',
   },
   loading: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
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

const ProductsList = (props: any) => {
   const classes = useStyles();
   const catalogId = props.match.params.id;
   const [info, setInfo] = useState<object>();
   const [selected, setSelected] = useState<any>([]);
   const [open, setOpen] = useState<boolean>(false);
   const currentUrl = useStore((state) => state.currentUrl);

   const {
      data: catalog = {},
      isLoading,
      isError,
      isSuccess,
      error,
      isFetching,
   } = useSingleCatalogQuery([`catalogs/:${catalogId}`, catalogId], catalogId);

   const { setSectionInfo } = useStore();

   const productColumns = useMemo(
      () =>
         catalog?.products?.length
            ? columnsCreator(catalog.products.map((product: any) => product.dinamicFields))
            : columns,
      [catalog]
   );
   const products: any[] = useMemo(() => (catalog?.products ? catalog.products : []), [catalog]);
   const customColumns = [...columns, ...productColumns];
   const rows: GridRowsProp = products;
   const params: any = useParams();
   const history = useHistory();

   useEffect(() => {
      if (catalog.name) {
         setSectionInfo(catalog.name, catalog.id);
         const initialValues = products.find((data: any) => data.id === params.productId);
         setInfo(initialValues);
         return () => setSectionInfo('');
      }
   }, [setSectionInfo, currentUrl, params.productId, products, catalog.name, catalog.id]);

   const NavBar = useMemo(
      () => <CustomNavBar title={catalog.name} catalogId={catalog.id} isProductListSection />,
      [catalog.name, catalog.id]
   );

   const handleCheckBoxes = useCallback((values: any[]) => {
      setSelected(values);
   }, []);
   return (
      <div className={`${classes.container} ${info ? classes.details : ''}`}>
         <div className={classes.mainBox}>
            {NavBar}
            <div className={classes.buttonsContainer}>
               <Button className={classes.button} variant="contained" disabled>
                  <FontAwesomeIcon size="lg" icon={faTags} />
                  <Typography className={classes.typographyButtons}>Enrichment</Typography>
               </Button>
               <Button className={classes.button} variant="contained" disabled>
                  <FontAwesomeIcon size="lg" icon={faPenNib} />
                  <Typography className={classes.typographyButtons}>Scribe</Typography>
               </Button>
               <Button className={classes.button} variant="contained" disabled>
                  <FontAwesomeIcon size="lg" icon={faRocket} />
                  <Typography className={classes.typographyButtons}>Assistant</Typography>
               </Button>
               <Button
                  className={classes.button}
                  variant="contained"
                  onClick={() => setOpen(true)}
                  disabled={!selected.length}
               >
                  <FontAwesomeIcon size="lg" icon={faTrash} />
               </Button>
               {open && (
                  <CustomDialog
                     isOpen={open}
                     onModalChange={() => setOpen(false)}
                     onAccept={() => removeProducts({ id: catalogId, productsId: selected })}
                     queryKey={[`catalogs/:${catalogId}`, catalogId]}
                     customMessage={(data: any) => {
                        const isNotSingular = Number(data.removedProducts) >= 2;
                        const msg = isNotSingular
                           ? 'products have been deleted successfully'
                           : 'product has been deleted successfully';
                        return `${data.removedProducts} ${msg}`;
                     }}
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
               <div>
                  <CustomAlert
                     alertType="error"
                     message={`An error occurred while loading the catalogs: ${error}`}
                  />
               </div>
            ) : null}
            {isSuccess && !isFetching ? (
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
                     if (cell.field === 'image')
                        return history.push(`/catalogs/${catalogId}/${cell.id}/details`);
                     if (cell.field === 'info') {
                        setInfo(cell.row);
                        return history.push(`/catalogs/${catalogId}/${cell.id}/`);
                     }
                  }}
               />
            ) : null}
         </div>
         {info && <SummaryDetails {...info} closeModal={setInfo} />}
      </div>
   );
};

export default ProductsList;
