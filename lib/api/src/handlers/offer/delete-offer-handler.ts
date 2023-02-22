import { OfferResponse } from '../../types'
import { RequestHandler } from '../../types/handlers/request-handler'
import { DeleteOfferApiRequest } from '../../types/models/api-requests/delete-offer-api-request'

export const deleteOfferHandler: RequestHandler<DeleteOfferApiRequest, OfferResponse> = (_req, _res): Promise<void> => {
  // const { userId, offerId } = req.body
  // const offer = await getOffer(offerId)
  // if (offer.owner.id !== userId) {
  //   return res.status(404).json({ error: `UNAUTHORIZED: Cannot delete this offer` })
  // }
  // return firestore()
  //   .collection(FirebaseDocument.OFFERS)
  //   .doc(offerId)
  //   .delete()
  //   .then(() => res.status(200).json({ offerId }))
  //   .catch((error) => res.status(500).json({ error: `SERVER ERROR: error deleting offer: ${errorMessage(error)}` }))
  // TODO according to new model and new specs
  return Promise.resolve()
}
