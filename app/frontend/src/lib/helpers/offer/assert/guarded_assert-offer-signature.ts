import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import type { OfferSignature } from '@echo/model/types/offer-signature'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function guarded_assertOfferSignature(
  offerSignature: Nullable<OfferSignature>
): asserts offerSignature is NonNullable<OfferSignature> {
  if (isNil(offerSignature)) {
    throw new BadRequestError('offer signature is nil')
  }
}
