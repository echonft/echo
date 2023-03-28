import { config } from '@lib/config/config'
import { getDefaultClient } from 'connectkit'
import { FunctionComponent, PropsWithChildren } from 'react'
import { createClient, WagmiConfig } from 'wagmi'

export const WagmiProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const client = createClient(
    getDefaultClient({
      appName: 'Echo NFT',
      alchemyId: config.alchemyKey,
      autoConnect: true,
      chains: config.chains
    })
  )
  return <WagmiConfig client={client}>{children}</WagmiConfig>
}
