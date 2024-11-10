import type { NftIndex } from '@echo/model/types/nft'
import { toLower } from 'ramda'

export function serializeNft<T extends NftIndex>(nft: T): Lowercase<string> {
  return toLower(`${nft.collection.slug}.${nft.tokenId}`)
}
