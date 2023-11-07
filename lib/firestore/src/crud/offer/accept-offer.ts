import { updateOfferState } from '@echo/firestore/crud/offer/update-offer-state'
import { addOfferSignature } from '@echo/firestore/crud/offer-signature/add-offer-signature'
import type { HexString } from '@echo/utils/types/hex-string'

export async function acceptOffer(offerId: string, userId: string, signature: HexString) {
  const offer = await updateOfferState(offerId, 'ACCEPTED')
  await addOfferSignature({ offerId, userId, signature })
  return offer
}
