import { convertRequestForOffer } from '../converters/request-for-offer/convert-request-for-offer'
import { getCollectionFromPath } from '../utils/collection/get-collection-from-path'
import { CollectionName, FirestoreRequestForOffer, mapRequestForOffer } from '@echo/firestore'
import { RequestForOffer } from '@echo/model'
import { atIndex, castAs, errorMessage, logger, promiseAll, toPromise, Void } from '@echo/utils'
import { DocumentChange, QueryDocumentSnapshot } from '@google-cloud/firestore'
import { andThen, converge, forEach, head, isNil, juxt, otherwise, pipe, prop, unless } from 'ramda'

export function listenToRequestForOffers(
  onChange: (requestForOffer: RequestForOffer, change: DocumentChange<FirestoreRequestForOffer>) => unknown
) {
  getCollectionFromPath<FirestoreRequestForOffer>(CollectionName.REQUESTS_FOR_OFFER).onSnapshot((snapshot) => {
    forEach(
      unless(
        pipe(prop('doc'), isNil),
        pipe(
          juxt([
            pipe(
              prop<QueryDocumentSnapshot<FirestoreRequestForOffer>>('doc'),
              convertRequestForOffer,
              mapRequestForOffer
            ),
            toPromise
          ]),
          promiseAll,
          andThen(
            converge(onChange, [
              pipe(head, castAs<RequestForOffer>),
              pipe(atIndex(1), castAs<DocumentChange<FirestoreRequestForOffer>>)
            ])
          ),
          otherwise((error) => {
            logger.error(`Error mapping request for offer in listenToRequestForOffers: ${errorMessage(error)}`)
          }),
          Void
        )
      ),
      snapshot.docChanges()
    )
  })
}
