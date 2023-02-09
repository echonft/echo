import { TradeResponse } from '../../types'
import { RequestHandler } from '../../types/handlers/request-handler'
import { UpdateTradeApiRequest } from '../../types/models/api-requests/update-trade-api-request'
import { getUserWithId } from '../../utils/requests'
import { FirebaseDocumentName } from '@echo/firebase'
import { firestore, trade as getTrade } from '@echo/firebase-admin'
import { errorMessage } from '@echo/utils'

export const updateTradeHandler: RequestHandler<UpdateTradeApiRequest, TradeResponse> = async (
  req,
  res
): Promise<void> => {
  const { tradeId, userId, ownerItems, counterpartyItems } = req.body
  const callerSnapshot = await getUserWithId(req)
  const trade = await getTrade(tradeId)
  // TODO create a wrapper for this
  if (!callerSnapshot.exists) {
    return res.status(404).json({ error: 'UNAUTHORIZED: No user found' })
  }
  if (trade.owner.id !== userId || trade.counterparty.id !== userId) {
    return res.status(404).json({ error: `UNAUTHORIZED: Cannot update this trade` })
  }
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
