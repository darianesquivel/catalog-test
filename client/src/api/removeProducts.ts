import axios from "axios";

type Tparams = {
  id: string;
  productsId: any;
};
export default async function removeProducts({ id, productsId }: Tparams) {
  return await axios
    .delete(`/catalogs/${id}/products`, {
      data: productsId,
    })
    .then((res: any) => res.data);
}
