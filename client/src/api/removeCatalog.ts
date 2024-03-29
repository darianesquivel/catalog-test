import axios from "axios";

type Tparams = {
  id: string;
};
export default async function removeCatalog({ id }: Tparams) {
  return await axios.delete(`/catalogs/${id}`).then((res: any) => res.data);
}
