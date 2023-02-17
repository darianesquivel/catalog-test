import axios from "axios";

export default async function getAllCatalogs() {
  return await axios
    .get("/catalogs")
    .then((res: any) => res.data)
    .catch((err: any) => err.message);
}
