import { getDocument, getDocumentSnapshot } from '../utils/document'
import { mapTrade } from '@echo/firebase/mappers/trade'
import { FirebaseDocument } from '@echo/firebase/paths/document-path'
import { Trade } from '@echo/model/trade'

/**
 * Get trade with id
 * @param id The trade id
 */
export function getTrade(id: string): Promise<Trade> {
  return getDocument(id, FirebaseDocument.TRADES, mapTrade)
}

/**
 * Get offer document snapshot with id
 * @param id The offer id
 */
export function getTradeSnapshot(id: string) {
  return getDocumentSnapshot(id, FirebaseDocument.TRADES)
}
