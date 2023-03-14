import { CreateOfferResponse } from '../../types'
import { RequestHandler } from '../../types/handlers/request-handler'
import { UpdateOfferApiRequest } from '../../types/models/api-requests/update-offer-api-request'

export const updateOfferHandler: RequestHandler<UpdateOfferApiRequest, CreateOfferResponse> = (
  _req,
  _res
): Promise<void> => {
  // const { userId, offerId, ownerItems, counterpartyItems } = req.body
  // const offer = await getOffer(offerId)
  // if (offer.owner.id !== userId) {
  //   return res.status(404).json({ error: `UNAUTHORIZED: Cannot update this offer` })
  // }
  // return firestore()
  //   .collection(FirebaseDocument.OFFERS)
  //   .doc(offerId)
  //   .update({
  //     ownerItems: JSON.stringify(ownerItems),
  //     counterPartyItems: JSON.stringify(counterpartyItems)
  //   })
  //   .then(() => res.status(200).json({ offerId }))
  //   .catch((error) => res.status(500).json({ error: `SERVER ERROR: error updating offer: ${errorMessage(error)}` }))
  // TODO according to new model and new specs
  return Promise.resolve()
}
