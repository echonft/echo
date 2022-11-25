import { CreateOfferRequest } from '../models/create-offer-request'
import { CreateOfferResponse } from '../models/create-offer-response'
import { ErrorResponse } from '../models/error-response'
import { getCollectionSnapshot } from '@echo/firebase-admin/getters/get-collection'
import { getUserSnapshot } from '@echo/firebase-admin/getters/get-user'
import { firestore } from '@echo/firebase-admin/services/firestore'
import { OfferStatus } from '@echo/model/offer'
import { NextApiResponse } from 'next'

const handler = async (req: CreateOfferRequest, res: NextApiResponse<CreateOfferResponse | ErrorResponse>) => {
  const { method } = req
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ error: `Method ${method} Not Allowed` })
  } else {
    const { type, ownerItems, counterpartyItems, collectionId, userId } = req.body
    const userSnapshot = await getUserSnapshot(userId)
    if (!userSnapshot.exists) {
      return res.status(404).json({ error: `UNAUTHORIZED: No user found` })
    }
    const collectionSnapshot = await getCollectionSnapshot(collectionId)
    if (!collectionSnapshot.exists) {
      return res.status(404).json({ error: `UNAUTHORIZED: No collection found` })
    }
    const newOffer = firestore().collection('offers').doc()
    return newOffer
      .set({
        collection: collectionSnapshot.ref,
        user: userSnapshot.ref,
        ownerItems: JSON.stringify(ownerItems),
        counterPartyItems: JSON.stringify(counterpartyItems),
        type,
        status: OfferStatus.OPEN
      })
      .then(() => res.status(200).json({ offerId: newOffer.id }))
      .catch((error) => res.status(500).json({ error: `SERVER ERROR: error creating offer: ${error}` }))
  }
}

export const createOffer = handler
