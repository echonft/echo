import { FirebaseDocument, mapTrade } from '@echo/firebase'
import { Trade } from '@echo/model'
import { document } from './document'

/**
 * Get trade with id
 * @param id The trade id
 */
export function trade(id: string): Promise<Trade> {
  return document(id, FirebaseDocument.TRADES, mapTrade)
}
