import { TradeResponse } from '../../types'
import { RequestHandler } from '../../types/handlers/request-handler'
import { CreateTradeApiRequest } from '../../types/models/api-requests/create-trade-api-request'

export const createTradeHandler: RequestHandler<CreateTradeApiRequest, TradeResponse> = (_req, _res) => {
  // const ownerSnapshot = await getUserWithId(req)
  // // TODO create a wrapper for this
  // if (!ownerSnapshot.exists) {
  //   const { ownerItems, counterpartyItems, counterpartyId, offerId } = req.body
  //   return res.status(404).json({ error: 'UNAUTHORIZED: No owner found' })
  // }
  // const counterpartySnapshot = await userSnapshot(counterpartyId)
  // if (!counterpartySnapshot.exists) {
  //   return res.status(404).json({ error: 'UNAUTHORIZED: No counterparty found' })
  // }
  // const offerSnapshot = await getOfferSnapshot(offerId)
  // if (!offerSnapshot.exists) {
  //   return res.status(404).json({ error: `UNAUTHORIZED: No offer found` })
  // }
  // const newTrade = firestore().collection(FirebaseDocument.TRADES).doc()
  // return newTrade
  //   .set({
  //     offer: offerSnapshot.ref,
  //     owner: ownerSnapshot.ref,
  //     status: SwapState.OPEN,
  //     counterparty: counterpartySnapshot.ref,
  //     ownerItems: JSON.stringify(ownerItems),
  //     counterPartyItems: JSON.stringify(counterpartyItems)
  //   })
  //   .then(() => res.status(200).json({ tradeId: newTrade.id }))
  //   .catch((error) => res.status(500).json({ error: `SERVER ERROR: error creating trade: ${errorMessage(error)}` }))
  // TODO according to new model and new specs
  return Promise.resolve()
}
