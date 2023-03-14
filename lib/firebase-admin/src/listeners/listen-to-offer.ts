import { convertOffer } from '../converters/offer/convert-offer'
import { getCollectionFromPath } from '../utils/collection/get-collection-from-path'
import { FirestoreOffer, mapOffer } from '@echo/firestore'
import { Offer } from '@echo/model'
import { toPromise } from '@echo/utils'
import { DocumentChange, QueryDocumentSnapshot } from '@google-cloud/firestore'
import { andThen, forEach, juxt, pipe, prop } from 'ramda'

export function listenToOffer(onChange: (offer: Offer, change: DocumentChange<FirestoreOffer>) => void) {
  // TODO it changed
  getCollectionFromPath<FirestoreOffer>('offers').onSnapshot((snapshot) => {
    forEach<DocumentChange<FirestoreOffer>>(
      pipe<
        [DocumentChange<FirestoreOffer>],
        [Promise<Offer>, Promise<DocumentChange<FirestoreOffer>>],
        Promise<[Offer, DocumentChange<FirestoreOffer>]>,
        void
      >(
        juxt<[DocumentChange<FirestoreOffer>], Promise<Offer>, Promise<DocumentChange<FirestoreOffer>>>([
          pipe(prop<QueryDocumentSnapshot<FirestoreOffer>>('doc'), convertOffer, mapOffer),
          toPromise
        ]),
        (promises) => Promise.all(promises),
        // TODO theres a better fp way
        andThen<[Offer, DocumentChange<FirestoreOffer>], void>(([offer, change]) => onChange(offer, change))
      )
    )(snapshot.docChanges())
  })
}

// TODO add logging
// otherwise((error) => {
//     logger.error(`Error mapping offer in listenToOffer: ${errorMessage(error)}`)
// }),
