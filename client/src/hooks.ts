import { useMutation } from "@tanstack/react-query";

export function useMutateHook(apiFunction: () => any) {
  return useMutation(apiFunction);
}
