import type { Nullable } from '@echo/utils/types/nullable'
import { toLower } from 'ramda'

export function getOpenSeaUrlForCollection(chainId: number, slug: string): Nullable<Lowercase<string>> {
  if (chainId === 1) {
    return toLower(`https://opensea.io/collection/${slug}`)
  }
  if (chainId === 11155111) {
    return toLower(`https://testnets.opensea.io/collection/${slug}`)
  }
  return undefined
}
