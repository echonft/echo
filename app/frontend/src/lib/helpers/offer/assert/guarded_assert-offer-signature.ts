import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import type { OfferSignature } from '@echo/model/types/offer-signature'
import { isNil } from 'ramda'

export function guarded_assertOfferSignature(
  offerSignature: OfferSignature | undefined
): asserts offerSignature is NonNullable<OfferSignature> {
  if (isNil(offerSignature)) {
    throw new BadRequestError('offer signature is nil')
  }
}
