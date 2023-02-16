import { document } from './document'
import { FirestorePath, FirestoreTrade, mapTrade } from '@echo/firebase'
import { Swap } from '@echo/model'

/**
 * Get trade with id
 * @param id The trade id
 */
export function trade(id: string): Promise<Swap> {
  return document<FirestoreTrade, Swap>(id, FirebaseDocument.TRADES, mapTrade)
}
