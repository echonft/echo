import { FirebaseMapperError } from '../errors/firebase-mapper-error'
import { FirebaseDocument, FirebaseTrade } from '../types'
import { DocumentSnapshot } from '../types/firestore'
import { document } from '../utils/document'
import { mapOffer } from './map-offer'
import { mapOfferItems } from './map-offer-item'
import { mapUser } from './map-user'
import { Trade, TradeStatus } from '@echo/model'

/**
 * Map a firebase trade snapshot to a trade
 * @param snapshot The document change snapshot
 * TODO Should figure out the naming
 * TODO Should make sure buyer/seller data is correct
 */
export async function mapTrade(snapshot: DocumentSnapshot<FirebaseTrade>): Promise<Trade> {
  const data = snapshot.data()
  if (!data) {
    throw new FirebaseMapperError(snapshot.id, FirebaseDocument.USERS)
  }
  return {
    id: snapshot.id,
    status: data.status as TradeStatus,
    counterpartyItems: mapOfferItems(data.counterpartyItems),
    ownerItems: mapOfferItems(data.ownerItems),
    offer: await document(data.offer.id, FirebaseDocument.OFFERS, mapOffer),
    counterparty: await document(data.counterparty.id, FirebaseDocument.USERS, mapUser),
    owner: await document(data.owner.id, FirebaseDocument.USERS, mapUser),
    threadId: data.threadId
  }
}
