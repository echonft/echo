import { document } from './document'
import { FirebaseDocument, FirebaseTrade, mapTrade } from '@echo/firebase'
import { Trade } from '@echo/model'

/**
 * Get trade with id
 * @param id The trade id
 */
export function trade(id: string): Promise<Trade> {
  return document<FirebaseTrade, Trade>(id, FirebaseDocument.TRADES, mapTrade)
}
