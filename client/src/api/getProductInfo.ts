import axios from "axios";
type Tparams = {
  catalogId: string;
  productId: string;
};
export default async function getProductInfo({
  catalogId,
  productId,
}: Tparams) {
  return await axios
    .get(`/catalogs/${catalogId}/${productId}`)
    .then((res: any) => res.data);
}
