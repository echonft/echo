import { convertOffer } from '../converters/offer/convert-offer'
import { getCollectionFromPath } from '../utils/collection/get-collection-from-path'
import { CollectionName, FirestoreOffer, mapOffer } from '@echo/firestore'
import { Offer } from '@echo/model'
import { atIndex, castAs, errorMessage, logger, promiseAll, toPromise, Void } from '@echo/utils'
import { DocumentChange, QueryDocumentSnapshot } from '@google-cloud/firestore'
import { andThen, converge, forEach, head, isNil, juxt, otherwise, pipe, prop, unless } from 'ramda'

// TODO Change to firestore data?
export function listenToOffers(onChange: (offer: Offer, change: DocumentChange<FirestoreOffer>) => unknown) {
  getCollectionFromPath<FirestoreOffer>(CollectionName.OFFERS).onSnapshot((snapshot) => {
    forEach(
      unless(
        pipe(prop('doc'), isNil),
        pipe(
          juxt([pipe(prop<QueryDocumentSnapshot<FirestoreOffer>>('doc'), convertOffer, mapOffer), toPromise]),
          promiseAll,
          andThen(
            converge(onChange, [pipe(head, castAs<Offer>), pipe(atIndex(1), castAs<DocumentChange<FirestoreOffer>>)])
          ),
          otherwise((error) => {
            logger.error(`Error mapping offer in listenToOffer: ${errorMessage(error)}`)
          }),
          Void
        )
      ),
      snapshot.docChanges()
    )
  })
}
