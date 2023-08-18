import { CollectionName } from '../../constants/collection-name'
import { offerDataConverter } from '../../converters/offer-data-converter'
import { Offer } from '../../types/model/offer'
import { firestore } from 'firebase-admin'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { head, isNil } from 'ramda'

export const getOfferSnapshotById = async (id: string) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.OFFERS)
    .where('id', '==', id)
    .withConverter(offerDataConverter)
    .get()

  if (querySnapshot.empty) {
    return Promise.reject('offer not found')
  }

  const documentSnapshot = head<QueryDocumentSnapshot<Offer>>(querySnapshot.docs)
  if (isNil(documentSnapshot)) {
    return Promise.reject('offer not found')
  }

  return documentSnapshot
}
