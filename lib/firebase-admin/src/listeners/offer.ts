import { getOffersReference } from '../getters/get-offers'
import { convertAdminDocumentSnapshot } from '../utils/document-snapshot'
import { mapOffer } from '@echo/firebase/mappers/offer'
import { FirebaseOffer } from '@echo/firebase/model/offer'
import { Offer } from '@echo/model/offer'
import { errorMessage } from '@echo/utils/error'
import { logger } from '@echo/utils/logger'
import { DocumentChange } from '@google-cloud/firestore'

export function listenToOffer(onChange: (offer: Offer, change: DocumentChange<FirebaseOffer>) => void) {
  getOffersReference().onSnapshot((snapshot) => {
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
