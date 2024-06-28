import { getChainId } from '@echo/utils/helpers/chains/get-chain-id'
import { getSupportedChains } from '@echo/utils/helpers/chains/get-supported-chains'
import { getViemChainById } from '@echo/web3/helpers/chain/get-viem-chain-by-id'
import { always, fromPairs, juxt, map, type NonEmptyArray, pipe, prop } from 'ramda'
import { type Chain, http, type Transport } from 'viem'
import { type Config, createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'

const chains = pipe(getSupportedChains, map(pipe(getChainId, getViemChainById)))() as NonEmptyArray<Chain>
export const wagmiConfig: Config = createConfig({
  connectors: [injected()],
  chains,
  transports: pipe<[NonEmptyArray<Chain>], [number, Transport][], Record<(typeof chains)[number]['id'], Transport>>(
    map(juxt([prop('id'), always(http())])),
    fromPairs<number, Transport>
  )(chains)
  // client({ chain }) {
  //   return getWalletClient(chain)
  // }
})
