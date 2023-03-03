import { convertOffer } from '../converters/offer/convert-offer'
import { getCollectionFromPath } from '../utils/collection/get-collection-from-path'
import { FirestoreOffer, mapOffer } from '@echo/firestore'
import { Offer } from '@echo/model'
import { atIndex, castAs, notNullable, promiseAll, toPromise } from '@echo/utils'
import { DocumentChange } from '@google-cloud/firestore'
import { andThen, converge, forEach, head, isNil, juxt, pipe, prop, unless } from 'ramda'

export function listenToOffer(onChange: (offer: Offer, change: DocumentChange<FirestoreOffer>) => void) {
  getCollectionFromPath<FirestoreOffer>('offers').onSnapshot((snapshot) => {
    forEach(
      unless(
        pipe(prop('doc'), isNil),
        pipe(
          juxt([pipe(notNullable(prop('doc')), convertOffer, mapOffer), toPromise]),
          promiseAll,
          andThen(
            converge(onChange, [pipe(head, castAs<Offer>), pipe(atIndex(1), castAs<DocumentChange<FirestoreOffer>>)])
          ),
          () => {
            return
          }
        )
      ),
      snapshot.docChanges()
    )
  })
}

// TODO add logging
// otherwise((error) => {
//     logger.error(`Error mapping offer in listenToOffer: ${errorMessage(error)}`)
// }),
