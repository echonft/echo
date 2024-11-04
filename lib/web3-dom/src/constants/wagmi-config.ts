import { sei } from 'viem/chains'
import { createConfig, http } from 'wagmi'
import { injected } from 'wagmi/connectors'

export const wagmiConfig = createConfig({
  connectors: [injected()],
  chains: [sei],
  transports: {
    [sei.id]: http()
  }
  // client({ chain }) {
  //   return createWalletClient({
  //     chain,
  //     transport: custom(window.ethereum)
  //   })
  // }
})
