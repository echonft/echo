import { documentDataArrayPropToModelArray } from '../helpers/converters/from-firestore/document-data-array-prop-to-model-array'
import { documentDataPropToModel } from '../helpers/converters/from-firestore/document-data-prop-to-model'
import { getExpiredProp } from '../helpers/converters/from-firestore/get-expired-prop'
import { numberPropToDate } from '../helpers/converters/from-firestore/number-prop-to-date'
import { datePropToNumber } from '../helpers/converters/to-firestore/date-prop-to-number'
import { modelArrayPropToDocumentDataArray } from '../helpers/converters/to-firestore/model-array-prop-to-document-data-array'
import { modelPropToDocumentData } from '../helpers/converters/to-firestore/model-prop-to-document-data'
import { removeUndefinedProps } from '../helpers/converters/to-firestore/remove-undefined-props'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { Offer } from '../types/model/offer'
import { OfferDocumentData } from '../types/model/offer-document-data'
import { offerItemDocumentDataConverter } from './offer-item-document-data-converter'
import { userDetailsDocumentDataConverter } from './user-details-document-data-converter'
import { applySpec, assoc, dissoc, has, lens, map, over, path, pipe, prop, when } from 'ramda'

export const offerDocumentDataConverter: FirestoreDocumentDataConverter<OfferDocumentData, Offer> = {
  fromFirestore: applySpec<Offer>({
    id: prop('id'),
    createdAt: numberPropToDate('createdAt'),
    expired: getExpiredProp,
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
    removeUndefinedProps,
    dissoc('expired'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    datePropToNumber('createdAt'),
    datePropToNumber('expiresAt'),
    datePropToNumber('postedAt'),
    modelPropToDocumentData('receiver', userDetailsDocumentDataConverter),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    when(
      has('receiverItems'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      over(lens(prop('receiverItems'), assoc('receiverItemsNftIds')), map(path(['nft', 'id'])))
    ),
    modelArrayPropToDocumentDataArray('receiverItems', offerItemDocumentDataConverter),
    modelPropToDocumentData('sender', userDetailsDocumentDataConverter),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    when(has('senderItems'), over(lens(prop('senderItems'), assoc('senderItemsNftIds')), map(path(['nft', 'id'])))),
    modelArrayPropToDocumentDataArray('senderItems', offerItemDocumentDataConverter)
  )
}
