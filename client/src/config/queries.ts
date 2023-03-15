import { useQuery } from "@tanstack/react-query";
import getAllCatalogs from "../api/getAllCatalogs";
import getCatalogById from "../api/getCatalogById";
import getFilteredCatalogs from "../api/getFilteredCatalogs";

export const useCatalogsQuery = (term?: string) => {
  return useQuery<any>(["catalogs"], () => {
    if (term) {
      return getFilteredCatalogs(term);
    } else {
      return getAllCatalogs();
    }
  });
};

export const useSingleCatalogQuery = (
  queryKeys: string[],
  catalogId: string
) => {
  return useQuery(queryKeys, () => getCatalogById(catalogId));
};
