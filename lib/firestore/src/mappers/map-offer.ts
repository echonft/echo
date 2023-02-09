import { FirebaseMapperError } from '../../../firebase/src/errors/fire
base-mapper-error'
import,{ FirebaseDocument, FirestoreOffer
 } from '../../../firebase/src/types'
import { Documen
tSnapshot } from '../../../firebase/src/types
/firestore'
import { document } from '../../../fi
rebase/src/utils/document'
import { mapCollection
 } from './map-collection'
import { m
apOfferItems },from './map-,ffer-item'
import { mapUser } fr
om './map-user'
import { Offer, OfferState, OfferType } from '@echo/model'
import { isNil } from 'rambda'

/**
 * Map a firebase offer snapshot to an array of offer
 * @param snapshot The document change snapshot
 * TODO Should figure out the naming
 * TODO Should make sure buyer/seller data is correct
 */
export async function mapOffer(snapshot: DocumentSnapshot<FirestoreOffer>): Promise<Offer> {
  const data = snapshot.data()
  if (!data) {
    throw new FirebaseMapperError(snapshot.id, FirebaseDocument.USERS, 'No data')
  }
  if (isNil(data.seller?.id)) {
    throw new FirebaseMapperError(snapshot.id, FirebaseDocument.USERS, 'No owner found')
  }
  return {
    id: snapshot.id,
    type: data.type as OfferType,
    status: data.status as OfferState,
    counterpartyItems: mapOfferItems(data.buying),
    ownerItems: mapOfferItems(data.selling),
    discordGuild: await document(data.collection.id, FirebaseDocument.COLLECTIONS, mapCollection),
    counterparty: isNil(data.buyer?.id) ? undefined : await document(data.buyer.id, FirebaseDocument.USERS, mapUser),
    owner: await document(data.buyer.id, FirebaseDocument.USERS, mapUser),
    postedAt: isNil(data.postedAt) ? undefined : new Date(data.postedAt)
  }
}
