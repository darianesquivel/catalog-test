import axios from 'axios';

export default async function removeCatalog(id: string) {
   return await axios.delete(`/catalogs/${id}`).then((res: any) => res.data);
}
