import { DeleteOfferRequest, OfferResponse } from '../../types'
import { RequestHandler } from '../../types/handlers/request-handler'
import { FirebaseDocument } from '@echo/firebase'
import { firestore, offer as getOffer } from '@echo/firebase-admin'
import { errorMessage } from '@echo/utils'

export const deleteOfferHandler: RequestHandler<DeleteOfferRequest, OfferResponse> = async (
  req,
  res
): Promise<void> => {
  const { userId, offerId } = req.body
  const offer = await getOffer(offerId)
  if (offer.owner.id !== userId) {
    return res.status(404).json({ error: `UNAUTHORIZED: Cannot delete this offer` })
  }
  return firestore()
    .collection(FirebaseDocument.OFFERS)
    .doc(offerId)
    .delete()
    .then(() => res.status(200).json({ offerId }))
    .catch((error) => res.status(500).json({ error: `SERVER ERROR: error deleting offer: ${errorMessage(error)}` }))
}
