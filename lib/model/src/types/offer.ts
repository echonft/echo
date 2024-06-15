import type { BaseOffer } from '@echo/model/types/base-offer'
import { serializeNft } from '@echo/model/types/nft'
import type { OfferState } from '@echo/model/types/offer-state'
import { serializeUser } from '@echo/model/types/user'
import type { WithSlug } from '@echo/model/types/with-slug'
import { propIsNotNil } from '@echo/utils/fp/prop-is-not-nil'
import type { DeepPartial } from '@echo/utils/types/deep-partial'
import type { HexString } from '@echo/utils/types/hex-string'
import type { OptionalRecord } from '@echo/utils/types/optional-record'
import { map, modify, pipe, when } from 'ramda'

export interface Offer extends WithSlug, BaseOffer {
  createdAt: number
  readOnly: boolean
  updatedAt: number
  idContract: HexString
  state: OfferState
}

export function serializeOffer<T extends DeepPartial<Offer & OptionalRecord<'id', string>>>(offer: T): T {
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    when(propIsNotNil('receiverItems'), modify('items', map(serializeNft))),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    when(propIsNotNil('senderItems'), modify('items', map(serializeNft))),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    when(propIsNotNil('receiver'), modify('creator', serializeUser)),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    when(propIsNotNil('sender'), modify('creator', serializeUser))
  )(offer) as T
}
