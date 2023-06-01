import { FirestoreOfferData } from '../../../firestore/src'
import { convertOffer } from '../converters/offer/convert-offer'
import { getCollectionFromPath } from '../utils/collection/get-collection-from-path'
import { CollectionName, FirestoreOffer } from '@echo/firestore'
import { atIndex, castAs, errorMessage, logger, promiseAll, toPromise, Void } from '@echo/utils'
import { DocumentChange, QueryDocumentSnapshot } from '@google-cloud/firestore'
import { andThen, converge, forEach, head, isNil, juxt, otherwise, pipe, prop, unless } from 'ramda'

export function listenToOffers(
  onChange: (offer: FirestoreOfferData, change: DocumentChange<FirestoreOffer>) => unknown
) {
  getCollectionFromPath<FirestoreOfferData>(CollectionName.OFFERS).onSnapshot((snapshot) => {
    forEach(
      unless(
        pipe(prop('doc'), isNil),
        pipe(
          juxt([pipe(prop<QueryDocumentSnapshot<FirestoreOffer>>('doc'), convertOffer), toPromise]),
          promiseAll,
          andThen(
            converge(onChange, [
              pipe(head, castAs<FirestoreOfferData>),
              pipe(atIndex(1), castAs<DocumentChange<FirestoreOffer>>)
            ])
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
