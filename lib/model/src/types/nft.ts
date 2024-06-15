import { type PartialNft } from '@echo/model/helpers/nft/get-nft-index'
import { type Collection, serializeCollection } from '@echo/model/types/collection'
import { type NftAttribute } from '@echo/model/types/nft-attribute'
import { serializeUser, type User } from '@echo/model/types/user'
import { propIsNotNil } from '@echo/utils/fp/prop-is-not-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { modify, type PartialRecord, pick, pipe, when } from 'ramda'

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
  // sometimes we might not have all the data needed to build the index, so lets clean the extra data that is
  // actually there, and keep the rest
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    when(propIsNotNil('collection'), modify('collection', serializeCollection)),
    when(propIsNotNil('owner'), serializeUser),
    // just keep whatever is important, if it's there
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pick(['id', 'collection', 'owner', 'tokenId'])
  )(nft) as T
}
