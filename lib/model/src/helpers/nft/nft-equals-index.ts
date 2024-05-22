import { mapNftToNftIndex } from '@echo/model/helpers/nft/map-nft-to-nft-index'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import { equals } from 'ramda'

export function nftEqualsIndex(index: NftIndex) {
  return function (nft: Nft) {
    return equals(index, mapNftToNftIndex(nft))
  }
}
