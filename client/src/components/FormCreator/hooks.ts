import { useMutation } from "@tanstack/react-query";
import queryClientConfig from "../../ReactQuery/queryClientConfig";

export function useMutateForm(
  keysToInvalidate: string[],
  apiFunction: () => any
) {
  return useMutation(apiFunction, {
    onSuccess: async (data) => {
      await queryClientConfig.invalidateQueries(keysToInvalidate);
    },
  });
}
