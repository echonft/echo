import { FirebaseCollection } from '../model/collection'
import { FirebaseOffer } from '../model/offer'
import { FirebaseUser } from '../model/user'
import { FirebaseDocumentPath } from '../paths/document-path'
import { mapCollection } from './collection'
import { mapUser } from './user'
import { Collection } from '@echo/model/collection'
import { NewOffer, Offer, OfferStatus, OfferType } from '@echo/model/offer'
import { OfferItem } from '@echo/model/offer-item'
import { User } from '@echo/model/user'
import { doc, DocumentSnapshot, getDoc, getFirestore } from 'firebase/firestore'
import { isEmpty, isNil } from 'ramda'

/**
 * Map a firebase offer snapshot to an array of offer
 * @param snapshot The document change snapshot
 * TODO Should figure out the naming
 * TODO Should make sure buyer/seller data is correct
 */
export async function mapOffer(snapshot: DocumentSnapshot<FirebaseOffer>): Promise<Offer> {
  const data = snapshot.data()!
  const buyer = data.buyer?.id
    ? await mapUser(
        (await getDoc(doc(getFirestore(), FirebaseDocumentPath.USERS, data.buyer.id))) as DocumentSnapshot<FirebaseUser>
      )
    : undefined
  const seller = data.seller?.id
    ? await mapUser(
        (await getDoc(
          doc(getFirestore(), FirebaseDocumentPath.USERS, data.seller.id)
        )) as DocumentSnapshot<FirebaseUser>
      )
    : undefined
  const collection = await mapCollection(
    (await getDoc(
      doc(getFirestore(), FirebaseDocumentPath.COLLECTIONS, data.collection.id)
    )) as DocumentSnapshot<FirebaseCollection>
  )
  return {
    id: snapshot.id,
    type: data.type as OfferType,
    status: data.status as OfferStatus,
    counterpartyItems: mapOfferItem(data.buying),
    ownerItems: mapOfferItem(data.selling),
    collection: collection,
    counterparty: buyer,
    owner: seller!,
    postedAt: isNil(data.postedAt) ? undefined : new Date(data.postedAt)
  }
}

export function mapOfferItem(itemsString: string): OfferItem[] | undefined {
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
