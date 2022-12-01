import { FirebaseMapperError } from '../errors/mapper-error'
import { FirebaseDocument, FirebaseOffer } from '../types'
import { document } from '../utils/document'
import { mapCollection } from './map-collection'
import { mapOfferItem } from './map-offer-item'
import { mapUser } from './map-user'
import { Offer, OfferStatus, OfferType } from '@echo/model'
import { DocumentSnapshot } from 'firebase/firestore'
import { isNil } from 'rambda'

/**
 * Map a firebase offer snapshot to an array of offer
 * @param snapshot The document change snapshot
 * TODO Should figure out the naming
 * TODO Should make sure buyer/seller data is correct
 */
export async function mapOffer(snapshot: DocumentSnapshot<FirebaseOffer>): Promise<Offer> {
  const data = snapshot.data()
  if (!data) {
    throw new FirebaseMapperError(snapshot.id, FirebaseDocument.USERS)
  }
  if (isNil(data.seller?.id)) {
    throw new FirebaseMapperError(snapshot.id, FirebaseDocument.USERS, 'No owner found')
  }
  return {
    id: snapshot.id,
    type: data.type as OfferType,
    status: data.status as OfferStatus,
    counterpartyItems: mapOfferItem(data.buying),
    ownerItems: mapOfferItem(data.selling),
    collection: await document(data.collection.id, FirebaseDocument.COLLECTIONS, mapCollection),
    counterparty: isNil(data.buyer?.id) ? undefined : await document(data.buyer.id, FirebaseDocument.USERS, mapUser),
    owner: await document(data.buyer.id, FirebaseDocument.USERS, mapUser),
    postedAt: isNil(data.postedAt) ? undefined : new Date(data.postedAt)
  }
}
