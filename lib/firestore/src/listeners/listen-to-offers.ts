import { CollectionName } from '../constants/collection-name'
import { convertOffer } from '../converters/offer/convert-offer'
import { getCollectionFromPath } from '../helpers/collection/get-collection-from-path'
import { FirestoreOffer } from '../types/model/collections/offer/firestore-offer'
import { FirestoreOfferData } from '../types/model/data/offer/firestore-offer-data'
import { atIndex, errorMessage, logger, promiseAll, toPromise, Void } from '@echo/utils'
import { DocumentChange, QueryDocumentSnapshot } from 'firebase-admin/firestore'
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          andThen(converge(onChange, [head, atIndex(1)])),
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
