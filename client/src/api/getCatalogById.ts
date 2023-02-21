import axios from "axios";

export default async function getCatalogById(id: string) {
  return await axios.get(`/catalogs/${id}`).then((res: any) => res.data);
}
