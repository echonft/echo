import { getAlchemyProviderApiKey } from '@echo/alchemy/helpers/get-alchemy-provider-api-key'
import { getChainId } from '@echo/web3/helpers/get-chain-id'
import { getWalletConnectProjectId } from '@echo/web3/helpers/get-wallet-connect-project-id'
import { type FallbackTransport } from 'viem'
import {
  type Config,
  configureChains,
  createConfig,
  mainnet,
  type PublicClient,
  sepolia,
  type WebSocketPublicClient
} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { alchemyProvider } from 'wagmi/providers/alchemy'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [getChainId() === 1 ? mainnet : sepolia],
  [alchemyProvider({ apiKey: getAlchemyProviderApiKey() })]
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
        // TODO
        description: 'TODO',
        url: process.env.VERCEL_URL,
        icons: [`${process.env.VERCEL_URL}/favicon.ico`]
      }
    }
  })
]

export const wagmiConfig: Config<
  PublicClient<FallbackTransport>,
  WebSocketPublicClient<FallbackTransport>
> = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient
})
