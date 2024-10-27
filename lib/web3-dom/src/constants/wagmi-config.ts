import { supportedChains } from '@echo/model/helpers/chain/supported-chains'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import { chains } from '@echo/web3/constants/chains'
import { __, pipe, prop } from 'ramda'
import { createWalletClient, custom } from 'viem'
import { type Config, createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'

export const wagmiConfig: Config = createConfig({
  connectors: [injected()],
  chains: pipe(supportedChains, nonEmptyMap(prop(__, chains)))(),
  client({ chain }) {
    return createWalletClient({
      chain,
      transport: custom(window.ethereum)
    })
  }
})
