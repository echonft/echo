import { MAINNET_CHAIN_ID, SEPOLIA_CHAIN_ID } from '@echo/utils/constants/chain-ids'
import type { Nullable } from '@echo/utils/types/nullable'
import { toLower } from 'ramda'

export function getOpenSeaUrlForCollection(chainId: number, slug: string): Nullable<Lowercase<string>> {
  if (chainId === MAINNET_CHAIN_ID) {
    return toLower(`https://opensea.io/collection/${slug}`)
  }
  if (chainId === SEPOLIA_CHAIN_ID) {
    return toLower(`https://testnets.opensea.io/collection/${slug}`)
  }
  return undefined
}
