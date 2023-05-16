import { convertOffer } from '../../converters/offer/convert-offer'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { CollectionName } from '@echo/firestore'
import { andThen, pipe } from 'ramda'

export const getFirestoreOfferData = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertOffer))(CollectionName.OFFERS, documentPath)
