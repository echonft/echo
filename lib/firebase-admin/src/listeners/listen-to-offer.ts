import { FirestoreOffer } from '@echo/firestore'
import { Offer } from '@echo/model'
import { DocumentChange } from '@google-cloud/firestore'

export function listenToOffer(_onChange: (offer: Offer, change: DocumentChange<FirestoreOffer>) => void) {
  // TODO it changed
  // getCollectionFromPath('offers').onSnapshot((snapshot) => {
  //   snapshot.docChanges().map((change: DocumentChange<FirestoreOffer>) => {
  //     mapOffer(change.doc)
  //       .then((offer) => {
  //         void onChange(offer, change)
  //       })
  //       .catch((error) => {
  //         logger.error(`Error mapping offer in listenToOffer: ${errorMessage(error)}`)
  //       })
  //   })
  // })
}
