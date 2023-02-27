import axios from "axios";

type Tparams = {
  id: string;
};
export default async function removeCatalog({ id }: Tparams) {
  console.log(`/catalogs/${id}`);
  return await axios.delete(`/catalogs/${id}`).then((res: any) => res.data);
}
