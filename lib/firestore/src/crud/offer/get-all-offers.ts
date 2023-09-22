import { CollectionName } from '@echo/firestore/constants/collection-name'
import { offerDataConverter } from '@echo/firestore/converters/offer/offer-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { invoker, map } from 'ramda'

export async function getAllOffers() {
  const querySnapshot = await firestoreApp().collection(CollectionName.OFFERS).withConverter(offerDataConverter).get()
  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreOffer[]
}
