import _ from "lodash";

export function columnsCreator(data: any[]) {
  if (!data.length) return data;
  const parsedArray = data
    .map((json: any) =>
      Object.entries(json).map(([key]: any) => ({
        field: key,
        headerName: key.replace(/\w/, (value: string) => value?.toUpperCase()),
        width: 150,
      }))
    )
    .reduce((acc: any, current: any) => {
      return [...acc, ...current];
    }, []);

  const finalColums = _.uniqBy(parsedArray, "field");

  return finalColums;
}
