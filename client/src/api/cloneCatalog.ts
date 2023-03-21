//catalogs/:id/clone
import axios from 'axios';
export default async function clonedCatalog(catalogId: string) {
   return await axios
      .post(`/catalogs/${catalogId}/clone`, {
         catalogId,
      })
      .then((res: any) => res.data);
}
