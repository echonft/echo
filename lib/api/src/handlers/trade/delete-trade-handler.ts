import { TradeResponse } from '../../types'
import { RequestHandler } from '../../types/handlers/request-handler'
import { DeleteTradeApiRequest } from '../../types/models/api-requests/delete-trade-api-request'
import { getUserWithId } from '../../utils/requests'
import { FirestorePath } from '@echo/firebase'
import { firestore, trade as getTrade } from '@echo/firebase-admin'
import { errorMessage } from '@echo/utils'

export const deleteTradeHandler: RequestHandler<DeleteTradeApiRequest, TradeResponse> = async (
  req,
  res
): Promise<void> => {
  const { tradeId, userId } = req.body
  const callerSnapshot = await getUserWithId(req)
  const trade = await getTrade(tradeId)
  // TODO create a wrapper for this
  if (!callerSnapshot.exists) {
    return res.status(404).json({ error: 'UNAUTHORIZED: No user found' })
  }
  if (trade.owner.id !== userId || trade.counterparty.id !== userId) {
    return res.status(404).json({ error: `UNAUTHORIZED: Cannot delete this trade` })
  }
  return firestore()
    .collection(FirebaseDocument.TRADES)
    .doc(tradeId)
    .delete()
    .then(() => res.status(200).json({ tradeId }))
    .catch((error) => res.status(500).json({ error: `SERVER ERROR: error deleting trade: ${errorMessage(error)}` }))
}
