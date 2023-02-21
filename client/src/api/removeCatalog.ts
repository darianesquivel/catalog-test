import axios from "axios";

type Tparams = {
  id: string;
};
export default async function removeCatalog({ id }: Tparams) {
  console.log("remove funciton front-->", { id });
  return await axios
    .delete(`/catalogs/delete/${id}`)
    .then((res: any) => res.data);
}
