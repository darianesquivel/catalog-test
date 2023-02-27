import axios from "axios";
export default async function addProducts(catalogId: string, data: any) {
  return await axios
    .post(`/catalogs/${catalogId}/products`, [...data])
    .then((res: any) => res.data);
}
