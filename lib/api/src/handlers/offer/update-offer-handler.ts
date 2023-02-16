import { OfferResponse } from '../../types'
import { RequestHandler } from '../../types/handlers/request-handler'
import { UpdateOfferApiRequest } from '../../types/models/api-requests/update-offer-api-request'
import { FirestorePath } from '@echo/firebase'
import { firestore, offer as getOffer } from '@echo/firebase-admin'
import { errorMessage } from '@echo/utils'

export const updateOfferHandler: RequestHandler<UpdateOfferApiRequest, OfferResponse> = async (
  req,
  res
): Promise<void> => {
  const { userId, offerId, ownerItems, counterpartyItems } = req.body
  const offer = await getOffer(offerId)
  if (offer.owner.id !== userId) {
    return res.status(404).json({ error: `UNAUTHORIZED: Cannot update this offer` })
  }
  return firestore()
    .collection(FirebaseDocument.OFFERS)
    .doc(offerId)
    .update({
      ownerItems: JSON.stringify(ownerItems),
      counterPartyItems: JSON.stringify(counterpartyItems)
    })
    .then(() => res.status(200).json({ offerId }))
    .catch((error) => res.status(500).json({ error: `SERVER ERROR: error updating offer: ${errorMessage(error)}` }))
}
