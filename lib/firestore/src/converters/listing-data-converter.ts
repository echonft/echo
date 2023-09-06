import { getSnapshotData } from '../helpers/converters/from-firestore/get-snapshot-data'
import { modifyDocumentDataArrayProp } from '../helpers/converters/from-firestore/modify-document-data-array-prop'
import { modifyDocumentDataProp } from '../helpers/converters/from-firestore/modify-document-data-prop'
import { modifyExpiresAtProp } from '../helpers/converters/from-firestore/modify-expiresAt-prop'
import { modifyModelArrayProp } from '../helpers/converters/to-firestore/modify-model-array-prop'
import { modifyModelProp } from '../helpers/converters/to-firestore/modify-model-prop'
import { FirestoreModel } from '../types/abstract/firestore-model'
import { ListingDocumentData } from '../types/model/listing-document-data'
import { listingItemDocumentDataConverter } from './listing-item-document-data-converter'
import { listingTargetDocumentDataConverter } from './listing-target-document-data-converter'
import { offerItemDocumentDataConverter } from './offer-item-document-data-converter'
import { userDetailsDocumentDataConverter } from './user-details-document-data-converter'
import { Listing } from '@echo/firestore-types'
import { modifyDatePropToNumber, modifyNumberPropToDate } from '@echo/utils'
import { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/firestore'
import { assoc, dissoc, has, lens, map, over, path, pipe, prop, uniq, when } from 'ramda'

export const listingDataConverter: FirestoreDataConverter<Partial<Listing>> = {
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
  toFirestore(modelObject: FirestoreModel<Listing>, _options?: SetOptions): ListingDocumentData {
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
