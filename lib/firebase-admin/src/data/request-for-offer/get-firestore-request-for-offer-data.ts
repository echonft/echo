import { convertRequestForOffer } from '../../converters/request-for-offer/convert-request-for-offer'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { CollectionName } from '@echo/firestore'
import { andThen, pipe } from 'ramda'

export const getFirestoreRequestForOfferData = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertRequestForOffer))(CollectionName.REQUESTS_FOR_OFFER, documentPath)
