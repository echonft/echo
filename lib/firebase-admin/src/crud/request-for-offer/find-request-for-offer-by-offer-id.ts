import { convertRequestForOffer } from '../../converters/request-for-offer/convert-request-for-offer'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { CollectionName, FirestoreRequestForOfferData } from '@echo/firestore'
import { errorPromise } from '@echo/utils'
import { andThen, head, ifElse, isEmpty, pipe } from 'ramda'

export const findRequestForOfferByOfferId = (offerId: string): Promise<FirestoreRequestForOfferData> =>
  pipe(
    getCollectionFromPath,
    whereCollection('offers', 'array-contains', getDocRefFromPath(CollectionName.OFFERS, offerId)),
    getCollectionDocs,
    andThen(
      ifElse(isEmpty, errorPromise<FirestoreRequestForOfferData>('not found'), pipe(head, convertRequestForOffer))
    )
  )(CollectionName.REQUESTS_FOR_OFFER)
