import { getChains } from '@echo/web3/helpers/get-chains'
import { getWalletClient } from '@echo/web3-dom/helpers/get-wallet-client'
import { type Config, createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'

export const wagmiConfig: Config = createConfig({
  connectors: [injected()],
  chains: getChains(),
  client({ chain }) {
    return getWalletClient(chain)
  }
})
