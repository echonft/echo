'use client'
import { themeExtension } from '@echo/ui/helpers/theme/theme'
import { isDev } from '@echo/utils/constants/is-dev'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider } from 'connectkit'
import { type FunctionComponent, type PropsWithChildren, useMemo } from 'react'
import { WagmiProvider } from 'wagmi'

export const Web3Provider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const queryClient = useMemo(() => new QueryClient(), [])
  return (
    <WagmiProvider config={wagmiConfig} reconnectOnMount={true}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          debugMode={isDev}
          customTheme={{
            '--ck-body-background': themeExtension.colors.dark['500'],
            '--ck-border-radius': '1rem',
            '--ck-modal-box-shadow': 'inset 0 0 0 2px rgba(255, 255, 255, 0.1)',
            '--ck-modal-heading-font-weight': '600',
            '--ck-overlay-background': 'rgba(0, 0, 0, 0.4)',
            '--ck-primary-button-border-radius': '0.5rem',
            '--ck-primary-button-box-shadow': 'none',
            '--ck-primary-button-background': 'rgba(255, 255, 255, 0.08)',
            '--ck-primary-button-hover-box-shadow': 'none',
            '--ck-primary-button-hover-background': themeExtension.colors.yellow['500'],
            '--ck-primary-button-hover-color': 'black',
            '--ck-primary-button-active-background': themeExtension.colors.yellow['500'],
            '--ck-primary-button-active-box-shadow': 'none',
            '--ck-primary-button-active-color': 'black'
          }}
          options={{
            hideQuestionMarkCTA: true,
            hideNoWalletCTA: true,
            overlayBlur: 8,
            // for some reason even on the right chain it keeps asking to switch network and the user is stuck...
            enforceSupportedChains: false
          }}
          theme="midnight"
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
