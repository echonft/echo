/* eslint-disable @typescript-eslint/ban-ts-comment */
import { buildRequestForOffer } from '../../builders/request-for-offer/build-request-for-offer'
import { convertRequestForOffer } from '../../converters/request-for-offer/convert-request-for-offer'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { CollectionName, FirestoreRequestForOfferData, FirestoreRequestForOfferPrototype } from '@echo/firestore'
import { castAs } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, partial, pipe, unless } from 'ramda'

export const addRequestForOffer = (
  requestForOfferPrototype: FirestoreRequestForOfferPrototype
): Promise<R.Result<FirestoreRequestForOfferData, Error>> =>
  pipe(
    buildRequestForOffer,
    andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.REQUESTS_FOR_OFFER).doc()])),
    andThen(
      pipe(
        // @ts-ignore
        unless(R.isError, pipe(R.getExn, convertRequestForOffer, R.fromPromise)),
        castAs<Promise<R.Result<FirestoreRequestForOfferData, Error>>>
      )
    )
  )(requestForOfferPrototype)
