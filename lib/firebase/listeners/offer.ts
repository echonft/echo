import { getOffersReference } from '../getters/get-offers'
import { mapOffer } from '../mappers/offer'
import { FirebaseOffer } from '../model/offer'
import { Offer } from '@echo/model/src/offer'
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
