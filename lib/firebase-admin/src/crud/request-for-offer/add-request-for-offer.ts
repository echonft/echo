/* eslint-disable @typescript-eslint/ban-ts-comment */
import { buildRequestForOffer } from '../../builders/request-for-offer/build-request-for-offer'
import { convertRequestForOffer } from '../../converters/request-for-offer/convert-request-for-offer'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { CollectionName, FirestoreRequestForOfferData, FirestoreRequestForOfferPrototype } from '@echo/firestore'
import { andThen, partial, pipe } from 'ramda'

export const addRequestForOffer = (
  requestForOfferPrototype: FirestoreRequestForOfferPrototype
): Promise<FirestoreRequestForOfferData> =>
  // @ts-ignore
  pipe(
    buildRequestForOffer,
    // @ts-ignore
    andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.REQUESTS_FOR_OFFER).doc()])),
    andThen(convertRequestForOffer)
  )(requestForOfferPrototype)
