import _ from 'lodash';
import Papa from 'papaparse';

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

   const finalColums = _.uniqBy(parsedArray, 'field');

   return finalColums;
}

export function downloadCSV(data: {}[], filename: string) {
   if (data?.length) {
      try {
         const formatedData = data.map((obj: any) => {
            const { title, name, ...attributes } = obj;
            return {
               title: title || name,
               ...attributes,
            };
         });
         const csv = Papa.unparse(formatedData);
         const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
         const url = URL.createObjectURL(blob);
         const link = document.createElement('a');
         link.href = url;
         link.setAttribute('download', `${filename}.csv`);
         document.body.appendChild(link);
         link.click();
         link?.parentNode?.removeChild(link);
      } catch (err) {
         console.log(err);
      }
   }
}
