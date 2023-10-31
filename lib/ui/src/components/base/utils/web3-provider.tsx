'use client'
import { wagmiConfig } from '@echo/web3/src/constants/wagmi-config'
import { ConnectKitProvider } from 'connectkit'
import { type FunctionComponent, type PropsWithChildren } from 'react'
import { WagmiConfig } from 'wagmi'

export const Web3Provider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  )
}
