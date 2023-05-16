/* eslint-disable @typescript-eslint/ban-ts-comment */
import { buildRequestForOffer } from '../../builders/request-for-offer/build-request-for-offer'
import { convertRequestForOffer } from '../../converters/request-for-offer/convert-request-for-offer'
import { FirestoreRequestForOfferPrototype } from '../../types/prototypes/request-for-offer/firestore-request-for-offer-prototype'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { CollectionName, FirestoreRequestForOffer, mapRequestForOffer } from '@echo/firestore'
import { RequestForOffer } from '@echo/model'
import { castAs } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, pipe, unless } from 'ramda'

export const addRequestForOffer = (
  requestForOfferPrototype: FirestoreRequestForOfferPrototype
): Promise<R.Result<RequestForOffer, Error>> =>
  pipe(
    buildRequestForOffer,
    // FIXME: andThen(partialRight(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.REQUESTS_FOR_OFFER).doc()]))
    // this no worken bacon
    andThen((requestsForOffer) =>
      // FIXME: This is where it breaks, requestForOffer seems to have an undefined value in activities and firestore
      // doesn't like that. I tried cleaning the object but it didn't work. Also tried adding the
      // ignoreUndefinedProperties to firestore, but we can only set options once and the firestore object is not persisted
      // so it seems to create a problem.
      setDocAndReturnSnapshot(
        getCollectionFromPath<FirestoreRequestForOffer>(CollectionName.REQUESTS_FOR_OFFER).doc(),
        requestsForOffer
      )
    ),
    andThen(
      pipe(
        unless(R.isError, pipe(R.getExn, convertRequestForOffer, mapRequestForOffer, R.fromPromise)),
        castAs<Promise<R.Result<RequestForOffer, Error>>>
      )
    )
  )(requestForOfferPrototype)
