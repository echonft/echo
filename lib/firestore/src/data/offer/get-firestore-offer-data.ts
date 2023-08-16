import { CollectionName } from '../../constants/collection-name'
import { convertOffer } from '../../converters/offer/convert-offer'
import { getDocSnapshot } from '../../helpers/document/get-doc-snapshot'
import { andThen, pipe } from 'ramda'

// TODO Should add a check if ID does not exist
export const getFirestoreOfferData = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertOffer))(CollectionName.OFFERS, documentPath)
