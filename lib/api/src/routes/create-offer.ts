import { CreateOfferRequest, CreateOfferResponse, ErrorResponse } from '../types'
import { collectionSnapshot, firestore, userSnapshot } from '@echo/firebase-admin'
import { OfferStatus } from '@echo/model'
import { errorMessage } from '@echo/utils'
import { NextApiResponse } from 'next'

const handler = async (
  req: CreateOfferRequest | DeleteOfferRequest | UpdateOfferRequest,
  res: NextApiResponse<CreateOfferResponse | ErrorResponse>
) => {
  const { method } = req
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ error: `Method ${method ?? ''} Not Allowed` })
  } else {
    const { type, ownerItems, counterpartyItems, collectionId, userId } = req.body
    const user = await userSnapshot(userId)
    if (!user.exists) {
      return res.status(404).json({ error: `UNAUTHORIZED: No user found` })
    }
    const collection = await collectionSnapshot(collectionId)
    if (!collection.exists) {
  const { userId } = req.body
  const userSnapshot = await getUserSnapshot(userId)
  if (method === 'POST') {
    const { type, ownerItems, counterpartyItems, collectionId } = (req as CreateOfferRequest).body
    const collectionSnapshot = await getCollectionSnapshot(collectionId)
    if (!collectionSnapshot.exists) {
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

export const createOffer = withIronSessionApiRoute(
  withExistingUser(withMethodValidation(handler, ['PUT', 'DELETE', 'POST'])),
  ironOptions
)
