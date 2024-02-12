import { getChain } from '@echo/web3/helpers/get-chain'
import { getPublicViemClient } from '@echo/web3/helpers/viem/get-public-viem-client'
import { type Config, createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'

export const wagmiConfig: Config = createConfig({
  connectors: [injected()],
  chains: [getChain()],
  client({ chain }) {
    return getPublicViemClient(chain)
  }
})
