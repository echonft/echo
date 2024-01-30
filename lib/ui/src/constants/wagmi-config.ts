import { getAlchemyProviderApiKey } from '@echo/alchemy/helpers/get-alchemy-provider-api-key'
import { getChain } from '@echo/web3/helpers/get-chain'
import { getWalletConnectProjectId } from '@echo/web3/helpers/get-wallet-connect-project-id'
import { type FallbackTransport } from 'viem'
import { type Config, configureChains, createConfig, type PublicClient, type WebSocketPublicClient } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { alchemyProvider } from 'wagmi/providers/alchemy'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [getChain()],
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
