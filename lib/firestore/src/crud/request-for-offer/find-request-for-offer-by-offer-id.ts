import { CollectionName } from '../../constants/collection-name'
import { convertRequestForOffer } from '../../converters/request-for-offer/convert-request-for-offer'
import { getCollectionDocs } from '../../helpers/collection/get-collection-docs'
import { getCollectionFromPath } from '../../helpers/collection/get-collection-from-path'
import { whereCollection } from '../../helpers/collection/where-collection'
import { getDocRefFromPath } from '../../helpers/document/get-doc-ref-from-path'
import { FirestoreRequestForOfferData } from '../../types/model/data/request-for-offer/firestore-request-for-offer-data'
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
