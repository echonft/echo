import { ethereumChainId, sepoliaChainId } from '@echo/utils/helpers/chains/chain-ids'
import type { Nullable } from '@echo/utils/types/nullable'
import { toLower } from 'ramda'

export function getOpenSeaUrlForCollection(chainId: number, slug: string): Nullable<Lowercase<string>> {
  if (chainId === ethereumChainId()) {
    return toLower(`https://opensea.io/collection/${slug}`)
  }
  if (chainId === sepoliaChainId()) {
    return toLower(`https://testnets.opensea.io/collection/${slug}`)
  }
  return undefined
}
