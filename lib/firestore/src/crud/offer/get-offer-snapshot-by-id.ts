import { CollectionName } from '../../constants/collection-name'
import { offerDataConverter } from '../../converters/offer-data-converter'
import { firestore } from '../../services/firestore'
import { Offer } from '../../types/model/offer'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { head, isNil } from 'ramda'

export const getOfferSnapshotById = async (id: string) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.OFFERS)
    .where('id', '==', id)
    .withConverter(offerDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  const documentSnapshot = head<QueryDocumentSnapshot<Offer>>(querySnapshot.docs)
  if (isNil(documentSnapshot)) {
    return undefined
  }

  return documentSnapshot
}
