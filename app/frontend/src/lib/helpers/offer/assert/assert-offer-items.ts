import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import type { Nft } from '@echo/model/types/nft'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { type NonEmptyArray } from 'ramda'

export function assertOfferItems(offerItems: Nullable<Nft[]>): asserts offerItems is NonEmptyArray<Nft> {
  if (isNilOrEmpty(offerItems)) {
    throw new BadRequestError('offer items are nil or empty')
  }
}
