import { config } from '@lib/config/config'
import { getDefaultClient } from 'connectkit'
import { FunctionComponent, ReactNode } from 'react'
import { createClient, WagmiConfig } from 'wagmi'

interface Props {
  children?: ReactNode | undefined
}

export const WagmiProvider: FunctionComponent<Props> = ({ children }) => {
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
