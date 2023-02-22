import { convertRequestForOffer } from '../../converters/request-for-offer/convert-request-for-offer'
import { ConvertRequestForOfferOptions } from '../../types/converter/request-for-offer/convert-request-for-offer-options'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { FirestoreRequestForOffer } from '@echo/firestore'

export const getFirestoreRequestForOfferData = (documentPath: string, options: ConvertRequestForOfferOptions) =>
  getDocSnapshot<FirestoreRequestForOffer>('requests-for-offer', documentPath).then(convertRequestForOffer(options))
