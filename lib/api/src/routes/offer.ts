import { FirebaseDocument } from '@echo/firebase'
import { collectionSnapshot, firestore, userSnapshot, offer as getOffer } from '@echo/firebase-admin'
import { OfferStatus } from '@echo/model'
import { errorMessage } from '@echo/utils'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiResponse } from 'next'
import { DeleteOfferRequest, ErrorResponse, OfferRequest, OfferResponse, UpdateOfferRequest } from '../types'
import { ironOptions, withExistingUser, withMethodValidation } from '../utils'

const handler = async (
  req: OfferRequest | DeleteOfferRequest | UpdateOfferRequest,
  res: NextApiResponse<OfferResponse | ErrorResponse>
) => {
  const { method } = req
  const { userId } = req.body
  const user = await userSnapshot(userId)
  if (method === 'POST') {
    const { type, ownerItems, counterpartyItems, collectionId } = (req as OfferRequest).body
    const collection = await collectionSnapshot(collectionId)
    if (!collection.exists) {
      return res.status(404).json({ error: `UNAUTHORIZED: No collection found` })
    }
    const newOffer = firestore().collection(FirebaseDocument.OFFERS).doc()
    return newOffer
      .set({
        collection: collection.ref,
        user: user.ref,
        ownerItems: JSON.stringify(ownerItems),
        counterPartyItems: JSON.stringify(counterpartyItems),
        type,
        status: OfferStatus.OPEN
      })
      .then(() => res.status(200).json({ offerId: newOffer.id }))
      .catch((error) => res.status(500).json({ error: `SERVER ERROR: error creating offer: ${errorMessage(error)}` }))
  } else {
    // PUT OR DELETE
    // Safe to use DeleteOfferRequest as it contains the offer we need to validate first
    const { offerId } = (req as DeleteOfferRequest).body
    const offer = await getOffer(offerId)
    if (offer.owner.id !== userId) {
      return res.status(404).json({ error: `UNAUTHORIZED: Cannot modify this offer` })
    }
    if (method === 'DELETE') {
      return firestore()
        .collection(FirebaseDocument.OFFERS)
        .doc(offerId)
        .delete()
        .then(() => res.status(200).json({ offerId }))
        .catch((error) => res.status(500).json({ error: `SERVER ERROR: error deleting offer: ${errorMessage(error)}` }))
    } else {
      // PUT
      const { ownerItems, counterpartyItems } = (req as UpdateOfferRequest).body
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
  }
}

export const offer = withIronSessionApiRoute(
  withExistingUser(withMethodValidation(handler, ['PUT', 'DELETE', 'POST'])),
  ironOptions
)
