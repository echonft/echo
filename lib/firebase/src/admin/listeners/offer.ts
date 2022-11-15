import { getOffersReference } from '@echo/firebase/admin/getters/get-offers'
import { mapOffer } from '@echo/firebase/admin/mappers/offer'
import { FirebaseOffer } from '@echo/firebase/model/offer'
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
