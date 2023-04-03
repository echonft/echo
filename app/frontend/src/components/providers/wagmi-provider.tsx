import { config } from '@lib/config/config'
import { getDefaultClient } from 'connectkit'
import { FunctionComponent, PropsWithChildren } from 'react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'

export const WagmiProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { chains, provider } = configureChains(config.chains, [alchemyProvider({ apiKey: config.alchemyKey })])

  const client = createClient(
    getDefaultClient({
      appName: 'Echo NFT',
      autoConnect: true,
      chains,
      provider
    })
  )
  return <WagmiConfig client={client}>{children}</WagmiConfig>
}
