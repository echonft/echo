import { getViemChains } from '@echo/web3/helpers/chain/get-viem-chains'
import { getWalletClient } from '@echo/web3-dom/helpers/get-wallet-client'
import { type Config, createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'

export const wagmiConfig: Config = createConfig({
  connectors: [injected()],
  chains: getViemChains(),
  client({ chain }) {
    return getWalletClient(chain)
  }
})
