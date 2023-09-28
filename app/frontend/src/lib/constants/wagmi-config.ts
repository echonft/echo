import { getAlchemyApiKey } from '@helpers/get-alchemy-api-key'
import { getWalletConnectProjectId } from '@helpers/get-wallet-connect-project-id'
import { FallbackTransport } from 'viem'
import { Config, configureChains, createConfig, PublicClient, sepolia, WebSocketPublicClient } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { alchemyProvider } from 'wagmi/providers/alchemy'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [alchemyProvider({ apiKey: getAlchemyApiKey() })]
)
const connectors = [
  new InjectedConnector({ chains }),
  new MetaMaskConnector({
    chains
  }),
  new WalletConnectConnector({
    chains,
    options: {
      projectId: getWalletConnectProjectId(),
      metadata: {
        name: 'Echo',
        description: 'TODO',
        url: 'https://www.echonft.xyz/',
        icons: ['https://www.echonft.xyz/favicon.ico']
      }
    }
  })
]

export const wagmiConfig: Config<
  PublicClient<FallbackTransport>,
  WebSocketPublicClient<FallbackTransport>
> = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
  webSocketPublicClient
})
