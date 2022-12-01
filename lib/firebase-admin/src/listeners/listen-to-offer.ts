import { offers } from '../getters'
import { convertAdminDocumentSnapshot } from '../utils/convert-admin-document-snapshot'
import { FirebaseOffer, mapOffer } from '@echo/firebase'
import { Offer } from '@echo/model'
import { errorMessage, logger } from '@echo/utils'
import { DocumentChange } from 'firebase-admin/firestore'

export function listenToOffer(onChange: (offer: Offer, change: DocumentChange<FirebaseOffer>) => void) {
  offers().onSnapshot((snapshot) => {
    snapshot.docChanges().map((change: DocumentChange<FirebaseOffer>) => {
      mapOffer(convertAdminDocumentSnapshot(change.doc))
        .then((offer) => {
          void onChange(offer, change)
        })
        .catch((error) => {
          logger.error(`Error mapping offer in listenToOffer: ${errorMessage(error)}`)
        })
    })
  })
}
