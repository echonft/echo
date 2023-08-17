import { documentDataArrayPropToModelArray } from '../helpers/converters/from-firestore/document-data-array-prop-to-model-array'
import { documentDataPropToModel } from '../helpers/converters/from-firestore/document-data-prop-to-model'
import { numberPropToDate } from '../helpers/converters/from-firestore/number-prop-to-date'
import { datePropToNumber } from '../helpers/converters/to-firestore/date-prop-to-number'
import { modelArrayPropToDocumentDataArray } from '../helpers/converters/to-firestore/model-array-prop-to-document-data-array'
import { modelPropToDocumentData } from '../helpers/converters/to-firestore/model-prop-to-document-data'
import { removeUndefinedProps } from '../helpers/converters/to-firestore/remove-undefined-props'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { Offer } from '../types/model/offer'
import { OfferDocumentData } from '../types/model/offer-document-data'
import { activityDocumentDataConverter } from './activity-document-data-converter'
import { offerItemDocumentDataConverter } from './offer-item-document-data-converter'
import { userDetailsDocumentDataConverter } from './user-details-document-data-converter'
import { applySpec, pipe, prop } from 'ramda'

export const offerDocumentDataConverter: FirestoreDocumentDataConverter<OfferDocumentData, Offer> = {
  fromFirestore: applySpec<Offer>({
    id: prop('id'),
    activities: documentDataArrayPropToModelArray('activities', activityDocumentDataConverter),
    createdAt: numberPropToDate('createdAt'),
    expiresAt: numberPropToDate('expiresAt'),
    postedAt: numberPropToDate('postedAt'),
    receiver: documentDataPropToModel('receiver', userDetailsDocumentDataConverter),
    receiverItems: documentDataArrayPropToModelArray('receiverItems', offerItemDocumentDataConverter),
    sender: documentDataPropToModel('sender', userDetailsDocumentDataConverter),
    senderItems: documentDataArrayPropToModelArray('senderItems', offerItemDocumentDataConverter),
    state: prop('state'),
    threadId: prop('threadId')
  }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    removeUndefinedProps,
    modelArrayPropToDocumentDataArray('activities', activityDocumentDataConverter),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    datePropToNumber('createdAt'),
    datePropToNumber('expiresAt'),
    datePropToNumber('postedAt'),
    modelPropToDocumentData('receiver', userDetailsDocumentDataConverter),
    modelArrayPropToDocumentDataArray('receiverItems', offerItemDocumentDataConverter),
    modelPropToDocumentData('sender', userDetailsDocumentDataConverter),
    modelArrayPropToDocumentDataArray('senderItems', offerItemDocumentDataConverter)
  )
}
