/* eslint-disable @typescript-eslint/ban-ts-comment */
import { buildOffer } from '../../builders/offer/build-offer'
import { convertOffer } from '../../converters/offer/convert-offer'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { CollectionName, FirestoreOfferData, FirestoreOfferPrototype } from '@echo/firestore'
import { castAs } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, partial, pipe, unless } from 'ramda'

export const addOffer = (offerPrototype: FirestoreOfferPrototype): Promise<R.Result<FirestoreOfferData, Error>> =>
  pipe(
    buildOffer,
    andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.OFFERS).doc()])),
    andThen(
      pipe(
        // @ts-ignore
        unless(R.isError, pipe(R.getExn, convertOffer, R.fromPromise)),
        castAs<Promise<R.Result<FirestoreOfferData, Error>>>
      )
    )
  )(offerPrototype)
