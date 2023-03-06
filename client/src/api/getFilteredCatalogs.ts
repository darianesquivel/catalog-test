import axios from "axios";

export default async function getFilteredCatalogs(query?: string) {
  const endpoint = `/catalogs?term=${query}`;
  return await axios.get(endpoint).then((res: any) => res.data);
}
