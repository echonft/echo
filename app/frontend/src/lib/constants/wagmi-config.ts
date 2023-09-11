import type { PublicClient, WebSocketPublicClient } from '@wagmi/core'
import { getDefaultConfig } from 'connectkit'
import { Config, createConfig } from 'wagmi'

export const wagmiConfig: Config<PublicClient, WebSocketPublicClient> = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: 'Echo',
    walletConnectProjectId: 'ad02a16e66caa96a353298a94462a942'
  })
)
