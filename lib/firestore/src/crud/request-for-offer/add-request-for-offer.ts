import { buildRequestForOffer } from '../../builders/request-for-offer/build-request-for-offer'
import { CollectionName } from '../../config/collection-name'
import { convertRequestForOffer } from '../../converters/request-for-offer/convert-request-for-offer'
import { FirestoreRequestForOfferData } from '../../types/model/data/request-for-offer/firestore-request-for-offer-data'
import { FirestoreRequestForOfferPrototype } from '../../types/prototypes/request-for-offer/firestore-request-for-offer-prototype'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { andThen, partial, pipe } from 'ramda'

export const addRequestForOffer: (
  requestForOfferPrototype: FirestoreRequestForOfferPrototype
) => Promise<FirestoreRequestForOfferData> = pipe(
  buildRequestForOffer,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.REQUESTS_FOR_OFFER).doc()])),
  andThen(convertRequestForOffer)
)
