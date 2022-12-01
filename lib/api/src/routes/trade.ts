import { FirebaseDocument } from '@echo/firebase'
import { firestore, offerSnapshot as getOfferSnapshot, trade as getTrade, userSnapshot } from '@echo/firebase-admin'
import { TradeStatus } from '@echo/model'
import { errorMessage } from '@echo/utils'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiResponse } from 'next'
import { CreateTradeRequest, DeleteTradeRequest, ErrorResponse, TradeResponse, UpdateTradeRequest } from '../types'
import { ironOptions, withMethodValidation } from '../utils'

const handler = async (
  req: CreateTradeRequest | DeleteTradeRequest | UpdateTradeRequest,
  res: NextApiResponse<TradeResponse | ErrorResponse>
) => {
  const { method } = req
  if (method === 'POST') {
    const { ownerItems, counterpartyItems, counterpartyId, ownerId, offerId } = (req as CreateTradeRequest).body
    const ownerSnapshot = await userSnapshot(ownerId)

    if (!ownerSnapshot.exists) {
      return res.status(404).json({ error: 'UNAUTHORIZED: No owner found' })
    }
    const counterpartySnapshot = await userSnapshot(counterpartyId)
    if (!counterpartySnapshot.exists) {
      return res.status(404).json({ error: 'UNAUTHORIZED: No counterparty found' })
    }
    const offerSnapshot = await getOfferSnapshot(offerId)
    if (!offerSnapshot.exists) {
      return res.status(404).json({ error: `UNAUTHORIZED: No offer found` })
    }
    const newTrade = firestore().collection(FirebaseDocument.TRADES).doc()
    return newTrade
      .set({
        offer: offerSnapshot.ref,
        owner: ownerSnapshot.ref,
        status: TradeStatus.OPEN,
        counterparty: counterpartySnapshot.ref,
        ownerItems: JSON.stringify(ownerItems),
        counterPartyItems: JSON.stringify(counterpartyItems)
      })
      .then(() => res.status(200).json({ tradeId: newTrade.id }))
      .catch((error) => res.status(500).json({ error: `SERVER ERROR: error creating trade: ${errorMessage(error)}` }))
  } else {
    // PUT OR DELETE
    // Safe to use DeleteTradeRequest as it contains the offer we need to validate first
    const { tradeId, userId } = (req as DeleteTradeRequest).body
    const callerSnapshot = await userSnapshot(userId)
    const trade = await getTrade(tradeId)

    if (!callerSnapshot.exists) {
      return res.status(404).json({ error: 'UNAUTHORIZED: No user found' })
    }
    if (trade.owner.id !== userId || trade.counterparty.id !== userId) {
      return res.status(404).json({ error: `UNAUTHORIZED: Cannot modify this trade` })
    }

    if (method === 'DELETE') {
      return firestore()
        .collection(FirebaseDocument.TRADES)
        .doc(tradeId)
        .delete()
        .then(() => res.status(200).json({ tradeId }))
        .catch((error) => res.status(500).json({ error: `SERVER ERROR: error deleting trade: ${errorMessage(error)}` }))
    } else {
      // PUT
      const { ownerItems, counterpartyItems } = (req as UpdateTradeRequest).body
      return firestore()
        .collection(FirebaseDocument.TRADES)
        .doc(tradeId)
        .update({
          ownerItems: JSON.stringify(ownerItems),
          counterPartyItems: JSON.stringify(counterpartyItems)
        })
        .then(() => res.status(200).json({ tradeId }))
        .catch((error) => res.status(500).json({ error: `SERVER ERROR: error updating trade: ${errorMessage(error)}` }))
    }
  }
}

export const trade = withIronSessionApiRoute(withMethodValidation(handler, ['PUT', 'DELETE', 'POST']), ironOptions)
