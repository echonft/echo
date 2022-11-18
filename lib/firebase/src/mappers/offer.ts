import { FirebaseMapperError } from '../errors/mapper-error'
import { mapCollection } from '../mappers/collection'
import { FirebaseOffer } from '../model/offer'
import { FirebaseDocument } from '../paths/document-path'
import { getDocument } from '../utils/document'
import { mapUser } from './user'
import { Offer, OfferStatus, OfferType } from '@echo/model/offer'
import { OfferItem } from '@echo/model/offer-item'
import { DocumentSnapshot } from 'firebase/firestore'
import { isEmpty, isNil } from 'ramda'

/**
 * Map a firebase offer snapshot to an array of offer
 * @param snapshot The document change snapshot
 * TODO Should figure out the naming
 * TODO Should make sure buyer/seller data is correct
 */
export async function mapOffer(snapshot: DocumentSnapshot<FirebaseOffer>): Promise<Offer> {
  const data = snapshot.data()
  if (!data) {
    return Promise.reject(new FirebaseMapperError(snapshot.id, FirebaseDocument.USERS))
  }
  const counterparty = data.buyer?.id ? await getDocument(data.buyer.id, FirebaseDocument.USERS, mapUser) : undefined
  const owner = data.seller?.id ? await getDocument(data.buyer.id, FirebaseDocument.USERS, mapUser) : undefined
  if (!owner) {
    return Promise.reject(new FirebaseMapperError(snapshot.id, FirebaseDocument.USERS, 'No owner found'))
  }
  const collection = await getDocument(data.collection.id, FirebaseDocument.COLLECTIONS, mapCollection)
  return {
    id: snapshot.id,
    type: data.type as OfferType,
    status: data.status as OfferStatus,
    counterpartyItems: mapOfferItem(data.buying),
    ownerItems: mapOfferItem(data.selling),
    collection: collection,
    counterparty,
    owner,
    postedAt: isNil(data.postedAt) ? undefined : new Date(data.postedAt)
  }
}

export function mapOfferItem(itemsString: string): OfferItem[] | undefined {
  if (isNil(itemsString) || isEmpty(itemsString)) {
    return undefined
  }
  return itemsString.split(',').map((itemString) => JSON.parse(itemString))
}
