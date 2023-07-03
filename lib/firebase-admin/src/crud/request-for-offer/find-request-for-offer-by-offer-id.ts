import { convertRequestForOffer } from '../../converters/request-for-offer/convert-request-for-offer'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { CollectionName, FirestoreRequestForOfferData } from '@echo/firestore'
import { castAs, errorPromise } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, head, ifElse, isEmpty, pipe } from 'ramda'

export const findRequestForOfferByOfferId = (offerId: string) =>
  pipe(
    getCollectionFromPath,
    whereCollection('offers', 'array-contains', getDocRefFromPath(CollectionName.OFFERS, offerId)),
    getCollectionDocs,
    andThen(
      ifElse(
        isEmpty,
        pipe(errorPromise<FirestoreRequestForOfferData>('not found'), R.fromPromise<FirestoreRequestForOfferData>),
        pipe(head, castAs, convertRequestForOffer, R.fromPromise<FirestoreRequestForOfferData>)
      )
    )
  )(CollectionName.REQUESTS_FOR_OFFER)
