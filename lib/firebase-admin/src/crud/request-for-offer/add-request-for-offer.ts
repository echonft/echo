/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FirestoreRequestForOfferPrototype } from '../../../../firestore/src/types/prototypes/request-for-offer/firestore-request-for-offer-prototype'
import { buildRequestForOffer } from '../../builders/request-for-offer/build-request-for-offer'
import { convertRequestForOffer } from '../../converters/request-for-offer/convert-request-for-offer'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { mapRequestForOffer } from '@echo/firestore'
import { RequestForOffer } from '@echo/model'
import { castAs } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, partial, pipe, unless } from 'ramda'

export const addRequestForOffer = (
  requestForOfferPrototype: FirestoreRequestForOfferPrototype
): Promise<R.Result<RequestForOffer, Error>> =>
  pipe(
    buildRequestForOffer,
    andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath('requests-for-offer').doc()])),
    andThen(
      pipe(
        // @ts-ignore
        unless(R.isError, pipe(R.getExn, convertRequestForOffer, mapRequestForOffer, R.fromPromise)),
        castAs<Promise<R.Result<RequestForOffer, Error>>>
      )
    )
  )(requestForOfferPrototype)
