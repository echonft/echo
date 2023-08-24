import { CollectionName } from '../constants/collection-name'
import { offerDataConverter } from '../converters/offer-data-converter'
import { firestore } from '../services/firestore'
import { Offer } from '../types/model/offer'
import { DocumentChange } from 'firebase-admin/firestore'
import { invoker, map } from 'ramda'

export function listenToOffers(onChange: (offers: Offer[], changes: DocumentChange<Offer>[]) => unknown) {
  return firestore()
    .collection(CollectionName.OFFERS)
    .withConverter(offerDataConverter)
    .onSnapshot((snapshot) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      onChange(map(invoker(0, 'data'), snapshot.docs), snapshot.docChanges())
    })
}
