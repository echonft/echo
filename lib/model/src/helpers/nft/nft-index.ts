import type { NftIndex } from '@echo/model/types/nft'
import { nftIndexSchema } from '@echo/model/validators/nft-schema'

export function nftIndex<T extends NftIndex>(nft: T): NftIndex {
  return nftIndexSchema.parse(nft)
}
