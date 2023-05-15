/* eslint-disable @typescript-eslint/ban-ts-comment */
import { buildOffer } from '../../builders/offer/build-offer'
import { convertOffer } from '../../converters/offer/convert-offer'
import { FirestoreOfferPrototype } from '../../types/prototypes/offer/firestore-offer-prototype'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { mapOffer } from '@echo/firestore'
import { Offer } from '@echo/model'
import { castAs } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, partial, pipe, unless } from 'ramda'

export const addOffer = (offerPrototype: FirestoreOfferPrototype): Promise<R.Result<Offer, Error>> =>
  pipe(
    buildOffer,
    andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath('offers').doc()])),
    andThen(
      pipe(
        // @ts-ignore
        unless(R.isError, pipe(R.getExn, convertOffer, mapOffer, R.fromPromise)),
        castAs<Promise<R.Result<Offer, Error>>>
      )
    )
  )(offerPrototype)
