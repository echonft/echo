import { datePropToNumber } from '../helpers/converters/date-prop-to-number'
import { documentDataArrayPropToModelArray } from '../helpers/converters/document-data-array-prop-to-model-array'
import { documentDataPropToModel } from '../helpers/converters/document-data-prop-to-model'
import { modelArrayPropToDocumentDataArray } from '../helpers/converters/model-array-prop-to-document-data-array'
import { modelPropToDocumentData } from '../helpers/converters/model-prop-to-document-data'
import { numberPropToDate } from '../helpers/converters/number-prop-to-date'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { Offer } from '../types/model/offer'
import { OfferDocumentData } from '../types/model/offer-document-data'
import { activityDocumentDataConverter } from './activity-document-data-converter'
import { offerItemDocumentDataConverter } from './offer-item-document-data-converter'
import { userDetailsDocumentDataConverter } from './user-details-document-data-converter'
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
    documentDataPropToModel('receiver', userDetailsDocumentDataConverter),
    documentDataArrayPropToModelArray('receiverItems', offerItemDocumentDataConverter),
    documentDataPropToModel('sender', userDetailsDocumentDataConverter),
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
    modelPropToDocumentData('receiver', userDetailsDocumentDataConverter),
    modelArrayPropToDocumentDataArray('receiverItems', offerItemDocumentDataConverter),
    modelPropToDocumentData('sender', userDetailsDocumentDataConverter),
    modelArrayPropToDocumentDataArray('senderItems', offerItemDocumentDataConverter)
  )
}
