import { getNftIndex, type PartialNft } from '@echo/model/helpers/nft/get-nft-index'
import { type Collection } from '@echo/model/types/collection'
import { type NftAttribute } from '@echo/model/types/nft-attribute'
import { type User } from '@echo/model/types/user'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc, type PartialRecord } from 'ramda'

export interface Nft {
  animationUrl?: Nullable<string>
  attributes: NftAttribute[]
  collection: Collection
  metadataUrl?: Nullable<string>
  name: string
  owner: User
  pictureUrl?: Nullable<string>
  tokenId: number
  updatedAt: number
}

export function serializeNft<T extends PartialNft & PartialRecord<'id', string>>(nft: T) {
  const index = getNftIndex(nft)
  if (propIsNil('id', nft)) {
    return index
  }
  return assoc('id', nft.id, index)
}
