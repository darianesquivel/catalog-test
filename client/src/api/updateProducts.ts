import axios from 'axios';

export default async function updateProducts(catalogId: string, changedProducts: any[]) {
   return await axios
      .put(`catalogs/${catalogId}/products/bulk`, {
         changedProducts,
      })
      .then((res: any) => res.data);
}
