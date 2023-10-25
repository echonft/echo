import { findOfferSignature } from '@echo/firestore/crud/offer-signature/find-offer-signature'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'

export async function getOfferSignature(offerId: string) {
  try {
    return await findOfferSignature(offerId)
  } catch (e) {
    throw new ServerError(`error getting signature for offer with id ${offerId}`, e)
  }
}
