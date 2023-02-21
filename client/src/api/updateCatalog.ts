import axios from "axios";

type Tparams = {
  id: string;
  name: string;
};
export default async function updateCatalog({ name, id }: Tparams) {
  return await axios
    .put(`/catalogs/update`, {
      id,
      name,
    })
    .then((res: any) => res.data);
}
