import { datePropToNumber } from '../helpers/converters/date-prop-to-number'
import { documentDataArrayPropToModelArray } from '../helpers/converters/document-data-array-prop-to-model-array'
import { modelArrayPropToDocumentDataArray } from '../helpers/converters/model-array-prop-to-document-data-array'
import { numberPropToDate } from '../helpers/converters/number-prop-to-date'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { Offer } from '../types/model/offer'
import { OfferDocumentData } from '../types/model/offer-document-data'
import { activityDocumentDataConverter } from './activity-document-data-converter'
import { offerItemDocumentDataConverter } from './offer-item-document-data-converter'
import { pipe } from 'ramda'

export const offerDocumentDataConverter: FirestoreDocumentDataConverter<OfferDocumentData, Offer> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    documentDataArrayPropToModelArray('activities', activityDocumentDataConverter),
    numberPropToDate('createdAt'),
    numberPropToDate('expiresAt'),
    numberPropToDate('postedAt'),
    documentDataArrayPropToModelArray('receiverItems', offerItemDocumentDataConverter),
    documentDataArrayPropToModelArray('senderItems', offerItemDocumentDataConverter)
  ),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modelArrayPropToDocumentDataArray('activities', activityDocumentDataConverter),
    datePropToNumber('createdAt'),
    datePropToNumber('expiresAt'),
    datePropToNumber('postedAt'),
    modelArrayPropToDocumentDataArray('receiverItems', offerItemDocumentDataConverter),
    modelArrayPropToDocumentDataArray('senderItems', offerItemDocumentDataConverter)
  )
}
