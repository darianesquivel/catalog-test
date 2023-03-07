import { QueryClient } from "@tanstack/react-query";

// instancia del cliente que vamos a necesitar para pasarle como prop al componente QueryClientProvider
const queryClientConfig = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

export default queryClientConfig;
