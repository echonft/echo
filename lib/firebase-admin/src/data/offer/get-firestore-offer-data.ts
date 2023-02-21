import { convertOffer } from '../../converters/offer/convert-offer'
import { ConvertOfferOptions } from '../../types/converter/offer/convert-offer-options'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { FirestoreOffer } from '@echo/firestore'

export const getFirestoreOfferData = (documentPath: string, options: ConvertOfferOptions) =>
  getDocSnapshot<FirestoreOffer>('offers', documentPath).then(convertOffer(options))
