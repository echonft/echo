import { buildOffer } from '../../builders/offer/build-offer'
import { CollectionName } from '../../constants/collection-name'
import { convertOffer } from '../../converters/offer/convert-offer'
import { getCollectionFromPath } from '../../helpers/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../helpers/document/set-doc-and-return-snapshot'
import { FirestoreOfferData } from '../../types/model/data/offer/firestore-offer-data'
import { FirestoreOfferPrototype } from '../../types/prototypes/offer/firestore-offer-prototype'
import { andThen, partial, pipe } from 'ramda'

export const addOffer: (offerPrototype: FirestoreOfferPrototype) => Promise<FirestoreOfferData> = pipe(
  buildOffer,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.OFFERS).doc()])),
  andThen(convertOffer)
)
