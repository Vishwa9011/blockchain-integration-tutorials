import { configureChains, createClient } from 'wagmi';
import './App.css'
import '@rainbow-me/rainbowkit/styles.css';
import { WagmiConfig } from "wagmi";
import { bscTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets, RainbowKitProvider, ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';
import Home from './Home';


const { chains, provider } = configureChains([bscTestnet], [publicProvider()])

const PROJECT_ID = "e16d2a53ebf71bcf5c94338734a733f8";
const APP_NAME = "integration-tutorial";

const { connectors } = getDefaultWallets({
  appName: APP_NAME,
  projectId: PROJECT_ID,
  chains,
})

const wagmiClient = createClient({
  autoConnect: true, connectors, provider
})



function App() {

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={darkTheme({})}>
          <Home />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}

export default App
