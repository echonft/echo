import { datePropToNumber } from '../helpers/converters/date-prop-to-number'
import { documentDataArrayPropToModelArray } from '../helpers/converters/document-data-array-prop-to-model-array'
import { documentDataPropToModel } from '../helpers/converters/document-data-prop-to-model'
import { modelArrayPropToDocumentDataArray } from '../helpers/converters/model-array-prop-to-document-data-array'
import { modelPropToDocumentData } from '../helpers/converters/model-prop-to-document-data'
import { numberPropToDate } from '../helpers/converters/number-prop-to-date'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { Swap } from '../types/model/swap'
import { SwapDocumentData } from '../types/model/swap-document-data'
import { activityDocumentDataConverter } from './activity-document-data-converter'
import { offerDocumentDataConverter } from './offer-document-data-converter'
import { pipe } from 'ramda'

export const swapDocumentDataConverter: FirestoreDocumentDataConverter<SwapDocumentData, Swap> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    documentDataArrayPropToModelArray('activities', activityDocumentDataConverter),
    numberPropToDate('createdAt'),
    numberPropToDate('expiresAt'),
    numberPropToDate('postedAt'),
    documentDataPropToModel('offer', offerDocumentDataConverter)
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
    modelPropToDocumentData('offer', offerDocumentDataConverter)
  )
}
