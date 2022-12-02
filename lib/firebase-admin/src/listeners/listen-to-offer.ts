import { offers } from '../getters'
import { FirebaseOffer, mapOffer } from '@echo/firebase'
import { Offer } from '@echo/model'
import { errorMessage, logger } from '@echo/utils'
import { DocumentChange } from '@google-cloud/firestore'

export function listenToOffer(onChange: (offer: Offer, change: DocumentChange<FirebaseOffer>) => void) {
  offers().onSnapshot((snapshot) => {
    snapshot.docChanges().map((change: DocumentChange<FirebaseOffer>) => {
      mapOffer(change.doc)
        .then((offer) => {
          void onChange(offer, change)
        })
        .catch((error) => {
          logger.error(`Error mapping offer in listenToOffer: ${errorMessage(error)}`)
        })
    })
  })
}
