import { useMutation, useQuery } from '@tanstack/react-query';
import getAllCatalogs from '../api/getAllCatalogs';
import getCatalogById from '../api/getCatalogById';
import getFilteredCatalogs from '../api/getFilteredCatalogs';
import getProductInfo from '../api/getProductInfo';
import cloneCatalog from '../api/cloneCatalog';
import removeCatalog from '../api/removeCatalog';
import updateCatalog from '../api/updateCatalog';
import removeProducts from '../api/removeProducts';
import createCatalog from '../api/createCatalog';
import addProducts from '../api/addProducts';

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

export const useCreateCatalog = () => {
   return useMutation((name: string) => {
      return createCatalog(name);
   });
};

export const useDuplicateCatalog = () => {
   return useMutation((catalogId: string) => cloneCatalog(catalogId));
};

export const useRemoveCatalog = (catalogId: string) => {
   return useMutation(() => removeCatalog(catalogId));
};

export const useUpdateCatalog = () => {
   return useMutation(({ catalogId, catalogName }: { catalogId: string; catalogName: string }) =>
      updateCatalog({ id: catalogId, name: catalogName })
   );
};

export const useDeleteProducts = () => {
   return useMutation(({ catalogId, productsId }: { catalogId: string; productsId: string[] }) =>
      removeProducts({ id: catalogId, productsId })
   );
};

export const useUploadProducts = () => {
   return useMutation(({ catalogId, data }: { catalogId: string; data: string[] }) =>
      addProducts(catalogId, data)
   );
};
