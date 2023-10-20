import type { OfferSignature } from '@echo/model/types/offer-signature'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { isNil } from 'ramda'

export function assertOfferSignature(
  offerSignature: OfferSignature | undefined
): asserts offerSignature is NonNullable<OfferSignature> {
  if (isNil(offerSignature)) {
    throw new BadRequestError('offer signature is nil')
  }
}
