import axios from "axios";
type content = {
  name: string;
  description: string;
};
export default async function createCatalog(params: content) {
  return await axios
    .post("/catalogs/catalog", {
      ...params,
    })
    .then((res: any) => res.data);
}
