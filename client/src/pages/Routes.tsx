import { Route, Switch } from 'react-router-dom';
import AddProducts from '../components/AddProducts';
import CatalogExplorer from './CatalogExplorer';
import ProductDetails from './Details/ProductDetails';
import NotFound from './NotFound';
import ProductsList from './ProductsList';

export default function Routes() {
   return (
      <Switch>
         <Route exact path="/" component={CatalogExplorer} />
         <Route exact path="/catalogs" component={CatalogExplorer} />
         <Route exact path="/catalogs/:id/upload" component={AddProducts} />
         <Route exact path="/catalogs/:id/:productId?" component={ProductsList} />
         <Route exact path="/catalogs/:id/:productId/details" component={ProductDetails} />
         <Route path="*" component={NotFound} />
      </Switch>
   );
}
