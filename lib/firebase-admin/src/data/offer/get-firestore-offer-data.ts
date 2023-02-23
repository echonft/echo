import { convertOffer } from '../../converters/offer/convert-offer'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { andThen, pipe } from 'ramda'

export const getFirestoreOfferData = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertOffer))('offers', documentPath)
