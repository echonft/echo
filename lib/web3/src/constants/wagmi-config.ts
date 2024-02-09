import { getChain } from '@echo/web3/helpers/get-chain'
import { getViemClient } from '@echo/web3/helpers/viem/get-viem-client'
import { type Config, createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'

export const wagmiConfig: Config = createConfig({
  connectors: [injected()],
  chains: [getChain()],
  client({ chain }) {
    return getViemClient(chain)
  }
})
