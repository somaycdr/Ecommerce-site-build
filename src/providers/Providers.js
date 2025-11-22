import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { http, WagmiProvider } from "wagmi";
import { holesky } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const Providers = ({ children }) => {
   const config = getDefaultConfig({
    appName: "ecommerce website",
    projectId: "9ea59132a30e4b3108727ff8c69f9b60",
    chains: [holesky],
    ssr: true, // If your dApp uses server side rendering (SSR)
    transports:{
        [holesky.id]: http()
    }
  });

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
