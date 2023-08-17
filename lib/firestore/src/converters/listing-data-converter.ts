import { datePropToNumber } from '../helpers/converters/date-prop-to-number'
import { documentDataArrayPropToModelArray } from '../helpers/converters/document-data-array-prop-to-model-array'
import { getSnapshotData } from '../helpers/converters/get-snapshot-data'
import { modelArrayPropToDocumentDataArray } from '../helpers/converters/model-array-prop-to-document-data-array'
import { numberPropToDate } from '../helpers/converters/number-prop-to-date'
import { FirestoreModel } from '../types/abstract/firestore-model'
import { Listing } from '../types/model/listing'
import { ListingDocumentData } from '../types/model/listing-document-data'
import { activityDocumentDataConverter } from './activity-document-data-converter'
import { listingTargetDocumentDataConverter } from './listing-target-document-data-converter'
import { offerDocumentDataConverter } from './offer-document-data-converter'
import { offerItemDocumentDataConverter } from './offer-item-document-data-converter'
import { swapDocumentDataConverter } from './swap-document-data-converter'
import { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export const listingDataConverter: FirestoreDataConverter<Listing> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<ListingDocumentData>): Listing {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pipe(
      getSnapshotData<ListingDocumentData>,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      documentDataArrayPropToModelArray('activities', activityDocumentDataConverter),
      numberPropToDate('createdAt'),
      numberPropToDate('expiresAt'),
      documentDataArrayPropToModelArray('items', offerItemDocumentDataConverter),
      documentDataArrayPropToModelArray('offers', offerDocumentDataConverter),
      numberPropToDate('postedAt'),
      documentDataArrayPropToModelArray('swaps', swapDocumentDataConverter),
      documentDataArrayPropToModelArray('targets', listingTargetDocumentDataConverter)
    )(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<Listing>, _options?: SetOptions): ListingDocumentData {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modelArrayPropToDocumentDataArray('activities', activityDocumentDataConverter),
      datePropToNumber('createdAt'),
      datePropToNumber('expiresAt'),
      modelArrayPropToDocumentDataArray('items', offerItemDocumentDataConverter),
      modelArrayPropToDocumentDataArray('offers', offerDocumentDataConverter),
      datePropToNumber('postedAt'),
      modelArrayPropToDocumentDataArray('swaps', swapDocumentDataConverter),
      modelArrayPropToDocumentDataArray('targets', listingTargetDocumentDataConverter)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    )(modelObject)
  }
}
