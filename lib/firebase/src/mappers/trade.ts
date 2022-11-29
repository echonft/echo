import { FirebaseMapperError } from '../errors/mapper-error'
import { mapOffer, mapOfferItem } from '../mappers/offer'
import { FirebaseTrade } from '../model/trade'
import { FirebaseDocument } from '../paths/document-path'
import { getDocument } from '../utils/document'
import { mapUser } from './user'
import { Trade, TradeStatus } from '@echo/model/trade'
import { DocumentSnapshot } from 'firebase/firestore'

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
    counterpartyItems: mapOfferItem(data.counterpartyItems),
    ownerItems: mapOfferItem(data.ownerItems),
    offer: await getDocument(data.offer.id, FirebaseDocument.OFFERS, mapOffer),
    counterparty: await getDocument(data.counterparty.id, FirebaseDocument.USERS, mapUser),
    owner: await getDocument(data.owner.id, FirebaseDocument.USERS, mapUser),
    threadId: data.threadId
  }
}
