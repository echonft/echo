import { FirebaseOffer } from '../../model/offer'
import { getOffersReference } from '../getters/get-offers'
import { mapOffer } from '../mappers/offer'
import { Offer } from '@echo/model/offer'
import { firestore } from 'firebase-admin'
import DocumentChange = firestore.DocumentChange

export function listenToOffers(onChange: (offer: Offer, change: DocumentChange<FirebaseOffer>) => Promise<void>) {
  getOffersReference().onSnapshot(async (snapshot) => {
    snapshot.docChanges().map(async (change: DocumentChange<FirebaseOffer>) => {
      const offer = await mapOffer(change.doc)
      await onChange(offer, change)
    })
  })
}
