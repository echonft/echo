import { convertRequestForOffer } from '../../converters/request-for-offer/convert-request-for-offer'
import { ConvertRequestForOfferOptions } from '../../types/converter/request-for-offer/convert-request-for-offer-options'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { andThen, pipe } from 'ramda'

export const getFirestoreRequestForOfferData = (documentPath: string, options: ConvertRequestForOfferOptions) =>
  pipe(getDocSnapshot, andThen(convertRequestForOffer(options)))('requests-for-offer', documentPath)
