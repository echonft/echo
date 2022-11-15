import { getCollection } from '../getters/get-collection'
import { getUser } from '../getters/get-user'
import { FirebaseOffer } from '@echo/firebase/model/offer'
import { Collection } from '@echo/model/src/collection'
import { NewOffer, Offer, OfferStatus, OfferType } from '@echo/model/src/offer'
import { OfferItem } from '@echo/model/src/offer-item'
import { User } from '@echo/model/src/user'
import { DocumentSnapshot } from '@google-cloud/firestore'
import { DocumentSnapshot as FirestoreDocumentSnapshot } from 'firebase/firestore'
import { isEmpty, isNil } from 'ramda'

/**
 * Map a firebase offer snapshot to an array of offer
 * @param snapshot The document change snapshot
 * TODO Should figure out the naming
 * TODO Should make sure buyer/seller data is correct
 */
export async function mapOffer(
  snapshot: DocumentSnapshot<FirebaseOffer> | FirestoreDocumentSnapshot<FirebaseOffer>
): Promise<Offer> {
  const data = snapshot.data()!
  const buyer = data.buyer?.id ? await getUser(data.buyer.id) : undefined
  const seller = data.seller?.id ? await getUser(data.seller.id) : undefined
  const collection = await getCollection(data.collection.id)
  return {
    id: snapshot.id,
    type: data.type as OfferType,
    status: data.status as OfferStatus,
    counterpartyItems: mapOfferItem(data.buying),
    ownerItems: mapOfferItem(data.selling),
    collection: collection!,
    counterparty: buyer,
    owner: seller!,
    postedAt: isNil(data.postedAt) ? undefined : new Date(data.postedAt),
  }
}

function mapOfferItem(itemsString: string): OfferItem[] | undefined {
  if (isNil(itemsString) || isEmpty(itemsString)) {
    return undefined
  }
  return itemsString.split(',').map((itemString) => JSON.parse(itemString))
}

export function createNewOffer(
  type: OfferType,
  collection: Collection,
  ownerItems: OfferItem[] | undefined,
  counterpartyItems: OfferItem[] | undefined,
  owner: User
): NewOffer {
  return { owner, type, status: OfferStatus.OPEN, ownerItems, counterpartyItems, collection }
}
