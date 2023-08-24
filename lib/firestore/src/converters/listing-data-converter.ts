import { documentDataArrayPropToModelArray } from '../helpers/converters/from-firestore/document-data-array-prop-to-model-array'
import { documentDataPropToModel } from '../helpers/converters/from-firestore/document-data-prop-to-model'
import { getExpiredProp } from '../helpers/converters/from-firestore/get-expired-prop'
import { getSnapshotData } from '../helpers/converters/from-firestore/get-snapshot-data'
import { numberPropToDate } from '../helpers/converters/from-firestore/number-prop-to-date'
import { datePropToNumber } from '../helpers/converters/to-firestore/date-prop-to-number'
import { modelArrayPropToDocumentDataArray } from '../helpers/converters/to-firestore/model-array-prop-to-document-data-array'
import { modelPropToDocumentData } from '../helpers/converters/to-firestore/model-prop-to-document-data'
import { removeUndefinedProps } from '../helpers/converters/to-firestore/remove-undefined-props'
import { FirestoreModel } from '../types/abstract/firestore-model'
import { Listing } from '../types/model/listing'
import { ListingDocumentData } from '../types/model/listing-document-data'
import { listingTargetDocumentDataConverter } from './listing-target-document-data-converter'
import { offerDocumentDataConverter } from './offer-document-data-converter'
import { offerItemDocumentDataConverter } from './offer-item-document-data-converter'
import { swapDocumentDataConverter } from './swap-document-data-converter'
import { userDetailsDocumentDataConverter } from './user-details-document-data-converter'
import { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/firestore'
import { applySpec, assoc, dissoc, has, lens, map, over, path, pipe, prop, when } from 'ramda'

export const listingDataConverter: FirestoreDataConverter<Listing> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<ListingDocumentData>): Listing {
    return pipe(
      getSnapshotData<ListingDocumentData>,
      applySpec<Listing>({
        id: prop('id'),
        createdAt: numberPropToDate('createdAt'),
        creator: documentDataPropToModel('creator', userDetailsDocumentDataConverter),
        expired: getExpiredProp,
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
      dissoc('expired'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      datePropToNumber('createdAt'),
      modelPropToDocumentData('creator', userDetailsDocumentDataConverter),
      datePropToNumber('expiresAt'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      when(has('items'), over(lens(prop('items'), assoc('itemsNftIds')), map(path(['nft', 'id'])))),
      modelArrayPropToDocumentDataArray('items', offerItemDocumentDataConverter),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      when(has('offers'), over(lens(prop('offers'), assoc('offersIds')), map(prop('id')))),
      modelArrayPropToDocumentDataArray('offers', offerDocumentDataConverter),
      datePropToNumber('postedAt'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      when(has('swaps'), over(lens(prop('swaps'), assoc('swapsIds')), map(prop('id')))),
      modelArrayPropToDocumentDataArray('swaps', swapDocumentDataConverter),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      when(has('targets'), over(lens(prop('targets'), assoc('targetsIds')), map(path(['collection', 'id'])))),
      modelArrayPropToDocumentDataArray('targets', listingTargetDocumentDataConverter)
    )(modelObject)
  }
}
