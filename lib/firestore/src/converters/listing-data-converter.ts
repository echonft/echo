import { listingItemDocumentDataConverter } from '@echo/firestore/converters/listing-item-document-data-converter'
import { listingTargetDocumentDataConverter } from '@echo/firestore/converters/listing-target-document-data-converter'
import { offerItemDocumentDataConverter } from '@echo/firestore/converters/offer-item-document-data-converter'
import { userDetailsDocumentDataConverter } from '@echo/firestore/converters/user-details-document-data-converter'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import { modifyDocumentDataArrayProp } from '@echo/firestore/helpers/converters/from-firestore/modify-document-data-array-prop'
import { modifyDocumentDataProp } from '@echo/firestore/helpers/converters/from-firestore/modify-document-data-prop'
import { modifyExpiresAtProp } from '@echo/firestore/helpers/converters/from-firestore/modify-expiresAt-prop'
import { modifyModelArrayProp } from '@echo/firestore/helpers/converters/to-firestore/modify-model-array-prop'
import { modifyModelProp } from '@echo/firestore/helpers/converters/to-firestore/modify-model-prop'
import type { FirestoreModel } from '@echo/firestore/types/abstract/firestore-model'
import type { FirestoreListing } from '@echo/firestore/types/model/firestore-listing'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import { modifyDatePropToNumber } from '@echo/utils/fp/modify-date-prop-to-number'
import { modifyNumberPropToDate } from '@echo/utils/fp/modify-number-prop-to-date'
import type { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/firestore'
import { assoc, dissoc, has, lens, map, over, path, pipe, prop, uniq, when } from 'ramda'

export const listingDataConverter: FirestoreDataConverter<Partial<FirestoreListing>> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<ListingDocumentData>) {
    return pipe(
      getSnapshotData<ListingDocumentData>,
      modifyNumberPropToDate('createdAt'),
      dissoc('creatorId'),
      modifyDocumentDataProp('creator', userDetailsDocumentDataConverter),
      modifyExpiresAtProp,
      modifyDocumentDataArrayProp('items', offerItemDocumentDataConverter),
      dissoc('itemsNftIds'),
      dissoc('itemsNftCollectionIds'),
      modifyDocumentDataArrayProp('targets', listingTargetDocumentDataConverter),
      dissoc('targetsIds')
    )(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<FirestoreListing>, _options?: SetOptions): ListingDocumentData {
    return pipe(
      dissoc('expired'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modifyDatePropToNumber('createdAt'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      when(has('creator'), over(lens(prop('creator'), assoc('creatorId')), prop('id'))),
      modifyModelProp('creator', userDetailsDocumentDataConverter),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modifyDatePropToNumber('expiresAt'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      when(has('items'), over(lens(prop('items'), assoc('itemsNftIds')), pipe(map(path(['nft', 'id'])), uniq))),
      when(
        has('items'),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        over(lens(prop('items'), assoc('itemsNftCollectionIds')), pipe(map(path(['nft', 'collection', 'id'])), uniq))
      ),
      modifyModelArrayProp('items', listingItemDocumentDataConverter),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      when(
        has('targets'),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        over(lens(prop('targets'), assoc('targetsIds')), pipe(map(path(['collection', 'id'])), uniq))
      ),
      modifyModelArrayProp('targets', listingTargetDocumentDataConverter)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    )(modelObject) as ListingDocumentData
  }
}
