import { FirebaseMapperError } from '../../../firebase/src/errors/fire
base-mapper-error'
import,{ FirebaseDocument, FirestoreTrade
 } from '../../../firebase/src/types'
import { Documen
tSnapshot } from '../../../firebase/src/types
/firestore'
import { document } from '.
./../../firebase/src/utils/document'
import { map
Offer } from './map-offer'
import { m
apOfferItems },from './map-offer-item'
import { mapUser } from './map-user'
import { Swap, SwapState } from '@echo/model'

/**
 * Map a firebase trade snapshot to a trade
 * @param snapshot The document change snapshot
 * TODO Should figure out the naming
 * TODO Should make sure buyer/seller data is correct
 */
export async function mapTrade(snapshot: DocumentSnapshot<FirestoreTrade>): Promise<Swap> {
  const data = snapshot.data()
  if (!data) {
    throw new FirebaseMapperError(snapshot.id, FirebaseDocument.USERS)
  }
  return {
    id: snapshot.id,
    status: data.status as SwapState,
    counterpartyItems: mapOfferItems(data.counterpartyItems),
    ownerItems: mapOfferItems(data.ownerItems),
    offer: await document(data.offer.id, FirebaseDocument.OFFERS, mapOffer),
    counterparty: await document(data.counterparty.id, FirebaseDocument.USERS, mapUser),
    owner: await document(data.owner.id, FirebaseDocument.USERS, mapUser),
    threadId: data.threadId
  }
}
