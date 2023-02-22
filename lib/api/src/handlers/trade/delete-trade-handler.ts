import { TradeResponse } from '../../types'
import { RequestHandler } from '../../types/handlers/request-handler'
import { DeleteTradeApiRequest } from '../../types/models/api-requests/delete-trade-api-request'

export const deleteTradeHandler: RequestHandler<DeleteTradeApiRequest, TradeResponse> = (_req, _res): Promise<void> => {
  // const { tradeId, userId } = req.body
  // const callerSnapshot = await getUserWithId(req)
  // const trade = await getTrade(tradeId)
  // // TODO create a wrapper for this
  // if (!callerSnapshot.exists) {
  //   return res.status(404).json({ error: 'UNAUTHORIZED: No user found' })
  // }
  // if (trade.owner.id !== userId || trade.counterparty.id !== userId) {
  //   return res.status(404).json({ error: `UNAUTHORIZED: Cannot delete this trade` })
  // }
  // return firestore()
  //   .collection(FirebaseDocument.TRADES)
  //   .doc(tradeId)
  //   .delete()
  //   .then(() => res.status(200).json({ tradeId }))
  //   .catch((error) => res.status(500).json({ error: `SERVER ERROR: error deleting trade: ${errorMessage(error)}` }))
  // TODO according to new model and new specs
  return Promise.resolve()
}
