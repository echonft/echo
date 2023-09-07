import { CollectionName } from '../../constants/collection-name'
import { offerDataConverter } from '../../converters/offer-data-converter'
import { firestore } from '../../services/firestore'
import { Offer } from '@echo/firestore-types'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { head, isNil } from 'ramda'

export async function getOfferSnapshotById(id: string) {
  const querySnapshot = await firestore()
    .collection(CollectionName.OFFERS)
    .where('id', '==', id)
    .withConverter(offerDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<Offer>
  if (isNil(documentSnapshot)) {
    return undefined
  }

  return documentSnapshot
}
