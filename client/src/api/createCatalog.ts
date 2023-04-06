import axios from 'axios';

export default async function createCatalog(name: string) {
   return await axios
      .post('/catalogs/catalog', {
         name,
      })
      .then((res: any) => res.data);
}
