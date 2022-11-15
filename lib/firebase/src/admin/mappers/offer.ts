import { getCollection } from '@echo/firebase/admin/getters/get-collection'
import { getUser } from '@echo/firebase/admin/getters/get-user'
import { FirebaseOffer } from '@echo/firebase/model/offer'
import { Offer, OfferStatus } from '@echo/model/src/offer'
import { DocumentSnapshot } from '@google-cloud/firestore'
import { DocumentSnapshot as FirestoreDocumentSnapshot } from 'firebase/firestore'
import { isNil } from 'ramda'

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
  const seller = await getUser(data.seller.id)
  const collection = await getCollection(data.collection.id)
  return {
    id: snapshot.id,
    status: data.status as OfferStatus,
    buying: data.buying,
    selling: data.selling,
    collection: collection!,
    buyer,
    seller: seller!,
    postedAt: isNil(data.postedAt) ? undefined : new Date(data.postedAt)
  }
}
