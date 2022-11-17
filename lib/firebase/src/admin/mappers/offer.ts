import { mapOfferItem } from '../../mappers/offer'
import { FirebaseOffer } from '../../model/offer'
import { getCollection } from '../getters/get-collection'
import { getUser } from '../getters/get-user'
import { Offer, OfferStatus, OfferType } from '@echo/model/offer'
import { DocumentSnapshot } from '@google-cloud/firestore'
import { isNil } from 'ramda'

/**
 * Map a firebase offer snapshot to an array of offer
 * @param snapshot The document change snapshot
 * TODO Should figure out the naming
 * TODO Should make sure buyer/seller data is correct
 */
export async function mapOffer(snapshot: DocumentSnapshot<FirebaseOffer>): Promise<Offer> {
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
    postedAt: isNil(data.postedAt) ? undefined : new Date(data.postedAt)
  }
}
