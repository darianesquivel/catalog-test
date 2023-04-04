import CatalogCard from '../components/Cards/CatalogCard';
import CustomAlert from '../components/CustomAlert';
import { useStore } from './DrawerAppbar';
//Component
import CatalogCreator from '../components/Cards/CatalogCreator';
// MUI
import { CircularProgress, Snackbar } from '@material-ui/core';
// REACT
import { useHistory } from 'react-router';
import { useState } from 'react';

// STYLES
import { makeStyles } from '@material-ui/core/styles';
import { shallow } from 'zustand/shallow';
import { useCatalogsQuery } from '../config/queries';

import CustomNavBar from '../components/CustomNavBar';
import NotFound from './NotFound';
import CloningCard from '../components/Cards/CloningCard';

const useStyles = makeStyles((theme) => ({
   gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax( 290px, 1fr))',
      gap: theme.spacing(2),
   },
   containerNoData: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      [theme.breakpoints.down(1000)]: {
         gridTemplateColumns: 'repeat(auto-fit, minmax( 290px, 1fr))',
      },
      gap: theme.spacing(2),
   },

   loading: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
   },
}));

type TcatalogCard = {
   id: string;
   name: string;
   products?: number;
   createdAt: string;
   image?: string;
   productCount: number;
   className?: any;
};
const getUrlTerm = (url: string) => url?.match(/(?<=term=).+/gi)?.[0];

const CatalogExplorer = (props: any) => {
   const classes = useStyles();
   const history = useHistory();

   const catalogsToClone = useStore((state) => state.catalogsToClone);

   const { searchingData } = useStore((state) => ({ searchingData: state.searchingData }), shallow);

   const term = getUrlTerm(history.location.search);
   const [open, setOpen] = useState(true);

   const { data: catalogs, isError, isLoading, isSuccess, error } = useCatalogsQuery(term);
   // We dont have other way to get a 'key' for each element because the same catalog may be clonated more than once
   const RenderCloning = catalogsToClone.length
      ? catalogsToClone.map(({ id, title }: any, index) => (
           <CloningCard catalogId={id} key={id + title + index} title={title} />
        ))
      : null;
   const handleSnackBar = () => setOpen(false);

   return (
      <div>
         <CustomNavBar />
         {catalogs && !catalogs.length && !isLoading && term ? (
            <div>
               <Snackbar
                  open={open}
                  autoHideDuration={5000}
                  onClose={handleSnackBar}
                  style={{ top: '80px' }}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
               >
                  <CustomAlert
                     title="Not found"
                     alertType="info"
                     message={`Catalogs not found with the name: ${term}`}
                  />
               </Snackbar>
            </div>
         ) : null}

         {isError ? (
            <NotFound error={error} info="An error occurred while loading the catalogs" />
         ) : isLoading || searchingData.isSearching ? (
            <div className={classes.loading}>
               <CircularProgress />
            </div>
         ) : isSuccess ? (
            <div
               className={
                  !catalogs || catalogs?.length < 5
                     ? classes.containerNoData
                     : classes.gridContainer
               }
            >
               <CatalogCreator />
               {RenderCloning}
               {catalogs.map((catalog: TcatalogCard) => {
                  return (
                     <CatalogCard
                        key={catalog.id}
                        id={catalog.id}
                        name={catalog.name}
                        createdAt={catalog['createdAt']}
                        productCount={catalog.productCount}
                        products={catalog.products}
                     />
                  );
               })}
            </div>
         ) : null}
      </div>
   );
};

export default CatalogExplorer;
