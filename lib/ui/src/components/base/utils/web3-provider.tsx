'use client'
import { wagmiConfig } from '@echo/web3/helpers/wagmi/wagmi-config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider } from 'connectkit'
import { type FunctionComponent, type PropsWithChildren, useMemo } from 'react'
import { WagmiProvider } from 'wagmi'

export const Web3Provider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const queryClient = useMemo(() => new QueryClient(), [])
  return (
    <WagmiProvider config={wagmiConfig} reconnectOnMount={true}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
