import { getOffersReference } from '../getters/get-offers'
import { convertAdminDocumentSnapshot } from '../utils/document-snapshot'
import { mapOffer } from '@echo/firebase/mappers/offer'
import { FirebaseOffer } from '@echo/firebase/model/offer'
import { Offer } from '@echo/model/offer'
import { DocumentChange } from '@google-cloud/firestore'

export function listenToOffer(onChange: (offer: Offer, change: DocumentChange<FirebaseOffer>) => Promise<void>) {
  getOffersReference().onSnapshot(async (snapshot) => {
    snapshot.docChanges().map(async (change: DocumentChange<FirebaseOffer>) => {
      const offer = await mapOffer(convertAdminDocumentSnapshot(change.doc))
      await onChange(offer, change)
    })
  })
}
