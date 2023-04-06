import { useQuery } from '@tanstack/react-query';
import getAllCatalogs from '../api/getAllCatalogs';
import getCatalogById from '../api/getCatalogById';
import getFilteredCatalogs from '../api/getFilteredCatalogs';
import getProductInfo from '../api/getProductInfo';

export const useCatalogsQuery = (term?: string) => {
   return useQuery<any>(['catalogs'], () => {
      if (term) {
         return getFilteredCatalogs(term);
      } else {
         return getAllCatalogs();
      }
   });
};

export const useSingleCatalogQuery = (queryKeys: string[], catalogId: string) => {
   return useQuery(queryKeys, () => getCatalogById(catalogId), {
      staleTime: 60 * 2000, // 1 minute
   });
};

export const useProductInfoQuery = (catalogId: string, productId: string, queryKeys: string[]) => {
   return useQuery(queryKeys, () => getProductInfo({ catalogId, productId }));
};
