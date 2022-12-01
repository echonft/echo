import { CreateOfferRequest, CreateOfferResponse, ErrorResponse } from '../types'
import { collectionSnapshot, firestore, userSnapshot } from '@echo/firebase-admin'
import { OfferStatus } from '@echo/model'
import { errorMessage } from '@echo/utils'
import { NextApiResponse } from 'next'

const handler = async (req: CreateOfferRequest, res: NextApiResponse<CreateOfferResponse | ErrorResponse>) => {
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
      return res.status(404).json({ error: `UNAUTHORIZED: No collection found` })
    }
    const newOffer = firestore().collection('offers').doc()
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
  }
}

export const createOffer = handler
