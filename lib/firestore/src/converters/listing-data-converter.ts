import { documentDataArrayPropToModelArray } from '../helpers/converters/from-firestore/document-data-array-prop-to-model-array'
import { documentDataPropToModel } from '../helpers/converters/from-firestore/document-data-prop-to-model'
import { getSnapshotData } from '../helpers/converters/from-firestore/get-snapshot-data'
import { numberPropToDate } from '../helpers/converters/from-firestore/number-prop-to-date'
import { datePropToNumber } from '../helpers/converters/to-firestore/date-prop-to-number'
import { modelArrayPropToDocumentDataArray } from '../helpers/converters/to-firestore/model-array-prop-to-document-data-array'
import { modelPropToDocumentData } from '../helpers/converters/to-firestore/model-prop-to-document-data'
import { removeUndefinedProps } from '../helpers/converters/to-firestore/remove-undefined-props'
import { FirestoreModel } from '../types/abstract/firestore-model'
import { Listing } from '../types/model/listing'
import { ListingDocumentData } from '../types/model/listing-document-data'
import { activityDocumentDataConverter } from './activity-document-data-converter'
import { listingTargetDocumentDataConverter } from './listing-target-document-data-converter'
import { offerDocumentDataConverter } from './offer-document-data-converter'
import { offerItemDocumentDataConverter } from './offer-item-document-data-converter'
import { swapDocumentDataConverter } from './swap-document-data-converter'
import { userDetailsDocumentDataConverter } from './user-details-document-data-converter'
import { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/firestore'
import { applySpec, pipe, prop } from 'ramda'

export const listingDataConverter: FirestoreDataConverter<Listing> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<ListingDocumentData>): Listing {
    return pipe(
      getSnapshotData<ListingDocumentData>,
      applySpec<Listing>({
        id: prop('id'),
        activities: documentDataArrayPropToModelArray('activities', activityDocumentDataConverter),
        createdAt: numberPropToDate('createdAt'),
        creator: documentDataPropToModel('creator', userDetailsDocumentDataConverter),
        expiresAt: numberPropToDate('expiresAt'),
        items: documentDataArrayPropToModelArray('items', offerItemDocumentDataConverter),
        offers: documentDataArrayPropToModelArray('offers', offerDocumentDataConverter),
        postedAt: numberPropToDate('postedAt'),
        state: prop('state'),
        swaps: documentDataArrayPropToModelArray('swaps', swapDocumentDataConverter),
        targets: documentDataArrayPropToModelArray('targets', listingTargetDocumentDataConverter)
      })
    )(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<Listing>, _options?: SetOptions): ListingDocumentData {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pipe(
      removeUndefinedProps,
      modelArrayPropToDocumentDataArray('activities', activityDocumentDataConverter),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      datePropToNumber('createdAt'),
      modelPropToDocumentData('creator', userDetailsDocumentDataConverter),
      datePropToNumber('expiresAt'),
      modelArrayPropToDocumentDataArray('items', offerItemDocumentDataConverter),
      modelArrayPropToDocumentDataArray('offers', offerDocumentDataConverter),
      datePropToNumber('postedAt'),
      modelArrayPropToDocumentDataArray('swaps', swapDocumentDataConverter),
      modelArrayPropToDocumentDataArray('targets', listingTargetDocumentDataConverter)
    )(modelObject)
  }
}
