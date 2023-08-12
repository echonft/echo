import { CollectionName } from '../config/collection-name'
import { convertRequestForOffer } from '../converters/request-for-offer/convert-request-for-offer'
import { FirestoreRequestForOffer } from '../types/model/collections/request-for-offer/firestore-request-for-offer'
import { FirestoreRequestForOfferData } from '../types/model/data/request-for-offer/firestore-request-for-offer-data'
import { getCollectionFromPath } from '../utils/collection/get-collection-from-path'
import { atIndex, errorMessage, logger, promiseAll, toPromise, Void } from '@echo/utils'
import { DocumentChange, QueryDocumentSnapshot } from '@google-cloud/firestore'
import { andThen, converge, forEach, head, isNil, juxt, otherwise, pipe, prop, unless } from 'ramda'

export function listenToRequestForOffers(
  onChange: (requestForOffer: FirestoreRequestForOfferData, change: DocumentChange<FirestoreRequestForOffer>) => unknown
) {
  getCollectionFromPath<FirestoreRequestForOffer>(CollectionName.REQUESTS_FOR_OFFER).onSnapshot((snapshot) => {
    forEach(
      unless(
        pipe(prop('doc'), isNil),
        pipe(
          juxt([pipe(prop<QueryDocumentSnapshot<FirestoreRequestForOffer>>('doc'), convertRequestForOffer), toPromise]),
          promiseAll,
          andThen(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            converge(onChange, [head, atIndex(1)])
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
