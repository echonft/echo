import { OfferResponse } from '../../types'
import { RequestHandler } from '../../types/handlers/request-handler'
import { CreateOfferApiRequest } from '../../types/models/api-requests/create-offer-api-request'

export const createOfferHandler: RequestHandler<CreateOfferApiRequest, OfferResponse> = async (_req, _res) => {
  // const user = await getUserWithId(req)
  // const { type, ownerItems, counterpartyItems, collectionId } = req.body
  // const collection = await collectionSnapshot(collectionId)
  // if (!collection.exists) {
  //   return res.status(404).json({ error: `UNAUTHORIZED: No collection found` })
  // }
  // const newOffer = firestore().collection(FirebaseDocument.OFFERS).doc()
  // return newOffer
  //   .set({
  //     collection: collection.ref,
  //     user: user.ref,
  //     ownerItems: JSON.stringify(ownerItems),
  //     counterPartyItems: JSON.stringify(counterpartyItems),
  //     type,
  //     status: OfferState.OPEN
  //   })
  //   .then(() => res.status(200).json({ offerId: newOffer.id }))
  //   .catch((error) => res.status(500).json({ error: `SERVER ERROR: error creating offer: ${errorMessage(error)}` }))
  // TODO according to new model and new specs
  return Promise.resolve()
}
