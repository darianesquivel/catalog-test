import axios from "axios";
export default async function cleanJson(catalogId: string, data: any) {
  return await axios
    .post(`/catalogs/${catalogId}/csv`, [...data])
    .then((res: any) => res.data);
}
