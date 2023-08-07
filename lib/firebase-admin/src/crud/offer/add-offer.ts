/* eslint-disable @typescript-eslint/ban-ts-comment */
import { buildOffer } from '../../builders/offer/build-offer'
import { convertOffer } from '../../converters/offer/convert-offer'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { CollectionName, FirestoreOfferData, FirestoreOfferPrototype } from '@echo/firestore'
import { andThen, partial, pipe } from 'ramda'

export const addOffer = (offerPrototype: FirestoreOfferPrototype): Promise<FirestoreOfferData> =>
  // @ts-ignore
  pipe(
    buildOffer,
    // @ts-ignore
    andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.OFFERS).doc()])),
    andThen(convertOffer)
  )(offerPrototype)
