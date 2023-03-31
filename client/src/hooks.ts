import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

type CopyToClipProps = [isCopied: boolean, copyToClipboard: (text: string) => Promise<any>];

export function useMutateHook(apiFunction: () => any) {
   return useMutation(apiFunction);
}

export function useCopyToClipboard() {
   const [isCopied, setIsCopied] = useState(false);

   useEffect(() => {
      if (isCopied) {
         const timeoutId = setTimeout(() => {
            setIsCopied(false);
         }, 2000);

         return () => {
            clearTimeout(timeoutId);
         };
      }
   }, [isCopied]);

   const copyToClipboard: (text: string) => void = (text = '') => {
      return navigator.clipboard.writeText(text).then(() => setIsCopied(true));
   };

   return [isCopied, copyToClipboard] as CopyToClipProps;
}
