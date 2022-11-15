import { config } from '@echo/frontend/lib/config/config'
import { getDefaultClient } from 'connectkit'
import React, { ReactNode } from 'react'
import { createClient, WagmiConfig } from 'wagmi'

interface Props {
  children?: ReactNode | undefined
}

export const WagmiProvider: React.FunctionComponent<Props> = ({ children }) => {
  const client = createClient(
    getDefaultClient({
      appName: 'Echo',
      alchemyId: config().alchemyKey,
      autoConnect: true,
      chains: config().chains
    })
  )
  return <WagmiConfig client={client}>{children}</WagmiConfig>
}
