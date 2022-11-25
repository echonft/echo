import { FirebaseMapperError } from '../errors/mapper-error'
import { mapCollection } from '../mappers/collection'
import { FirebaseOffer } from '../model/offer'
import { FirebaseDocument } from '../paths/document-path'
import { getDocument } from '../utils/document'
import { mapUser } from './user'
import { Offer, OfferStatus, OfferType } from '@echo/model/offer'
import { OfferItem } from '@echo/model/offer-item'
import { errorMessage } from '@echo/utils/error'
import { DocumentSnapshot } from 'firebase/firestore'
import { isEmpty, isNil } from 'rambda'

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
    collection: await getDocument(data.collection.id, FirebaseDocument.COLLECTIONS, mapCollection),
    counterparty: isNil(data.buyer?.id) ? undefined : await getDocument(data.buyer.id, FirebaseDocument.USERS, mapUser),
    owner: await getDocument(data.buyer.id, FirebaseDocument.USERS, mapUser),
    postedAt: isNil(data.postedAt) ? undefined : new Date(data.postedAt)
  }
}

function parseOfferItem(offerItemString: string): OfferItem {
  try {
    const offerItem = JSON.parse(offerItemString) as Record<string, unknown>
    // TODO validate json (see https://gcanti.github.io/io-ts/)
    return offerItem as unknown as OfferItem
  } catch (error) {
    throw Error(`error parsing offer item.\ninput: ${offerItemString}\nerror:${errorMessage(error)}`)
  }
}

export function mapOfferItem(itemsString: string): OfferItem[] {
  if (isNil(itemsString) || isEmpty(itemsString)) {
    return []
  }
  return itemsString.split(',').map(parseOfferItem)
}
