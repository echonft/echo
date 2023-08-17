import { documentDataArrayPropToModelArray } from '../helpers/converters/from-firestore/document-data-array-prop-to-model-array'
import { documentDataPropToModel } from '../helpers/converters/from-firestore/document-data-prop-to-model'
import { numberPropToDate } from '../helpers/converters/from-firestore/number-prop-to-date'
import { datePropToNumber } from '../helpers/converters/to-firestore/date-prop-to-number'
import { modelArrayPropToDocumentDataArray } from '../helpers/converters/to-firestore/model-array-prop-to-document-data-array'
import { modelPropToDocumentData } from '../helpers/converters/to-firestore/model-prop-to-document-data'
import { removeUndefinedProps } from '../helpers/converters/to-firestore/remove-undefined-props'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { Swap } from '../types/model/swap'
import { SwapDocumentData } from '../types/model/swap-document-data'
import { activityDocumentDataConverter } from './activity-document-data-converter'
import { offerDocumentDataConverter } from './offer-document-data-converter'
import { applySpec, pipe, prop } from 'ramda'

export const swapDocumentDataConverter: FirestoreDocumentDataConverter<SwapDocumentData, Swap> = {
  fromFirestore: applySpec<Swap>({
    id: prop('id'),
    activities: documentDataArrayPropToModelArray('activities', activityDocumentDataConverter),
    createdAt: numberPropToDate('createdAt'),
    expiresAt: numberPropToDate('expiresAt'),
    offer: documentDataPropToModel('offer', offerDocumentDataConverter),
    postedAt: numberPropToDate('postedAt'),
    state: prop('state')
  }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: pipe(
    removeUndefinedProps,
    modelArrayPropToDocumentDataArray('activities', activityDocumentDataConverter),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    datePropToNumber('createdAt'),
    datePropToNumber('expiresAt'),
    modelPropToDocumentData('offer', offerDocumentDataConverter),
    datePropToNumber('postedAt')
  )
}
