import axios from "axios";

export default async function getCatalogById(id: string) {
  const r = await axios.get(`/catalogs/${id}`).then((res: any) => res.data);
  console.log("R ===>", r);
  return await axios.get(`/catalogs/${id}`).then((res: any) => res.data);
}
