import axios from "axios";
export default async function addProducts(params: any) {
  return await axios
    .post("/addproducts/:id", [...params])
    .then((res: any) => res.data);
}
