import axios from "axios";

export default async function getAllCatalogs() {
  return await axios
    .get("/catalogs", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
      },
    })
    .then((res: any) => res.data);
}
