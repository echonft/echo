import { type ListingState } from '@echo/model/types/listing-state'
import { type ListingTarget, serializeListingTarget } from '@echo/model/types/listing-target'
import { type Nft, serializeNft } from '@echo/model/types/nft'
import { serializeUser, type User } from '@echo/model/types/user'
import type { WithSlug } from '@echo/model/types/with-slug'
import { propIsNotNil } from '@echo/utils/fp/prop-is-not-nil'
import type { DeepPartial } from '@echo/utils/types/deep-partial'
import type { OptionalRecord } from '@echo/utils/types/optional-record'
import { map, modify, pipe, when } from 'ramda'

export interface Listing extends WithSlug {
  createdAt: number
  creator: User
  expiresAt: number
  items: Nft[]
  readOnly: boolean
  state: ListingState
  target: ListingTarget
  updatedAt: number
}

export function serializeListing<T extends DeepPartial<Listing & OptionalRecord<'id', string>>>(listing: T): T {
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    when(propIsNotNil('creator'), modify('creator', serializeUser)),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    when(propIsNotNil('items'), modify('items', map(serializeNft))),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    when(propIsNotNil('target'), modify('target', serializeListingTarget))
  )(listing) as T
}
