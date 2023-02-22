import { convertOffer } from '../../converters/offer/convert-offer'
import { ConvertOfferOptions } from '../../types/converter/offer/convert-offer-options'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { andThen, pipe } from 'ramda'

export const getFirestoreOfferData = (documentPath: string, options: ConvertOfferOptions) =>
  pipe(getDocSnapshot, andThen(convertOffer(options)))('offers', documentPath)
