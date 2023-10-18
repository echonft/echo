import { assocExpiredProp } from '@echo/firestore/helpers/converters/from-firestore/assoc-expired-prop'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import { type ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { type Listing } from '@echo/model/types/listing'
import {
  type FirestoreDataConverter,
  type PartialWithFieldValue,
  type QueryDocumentSnapshot
} from 'firebase-admin/lib/firestore'
import { assoc, dissoc, has, lens, map, over, path, pipe, prop, uniq, when } from 'ramda'

export const listingDataConverter: FirestoreDataConverter<Listing> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<ListingDocumentData>) {
    return pipe(
      getSnapshotData<ListingDocumentData>,
      assocExpiredProp,
      dissoc('itemsNftIds'),
      dissoc('itemsNftCollectionIds'),
      dissoc('targetsIds')
    )(snapshot)
  },
  toFirestore(modelObject: PartialWithFieldValue<Listing>) {
    return pipe(
      dissoc('expired'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      when(has('items'), over(lens(prop('items'), assoc('itemsNftIds')), pipe(map(path(['nft', 'id'])), uniq))),
      when(
        has('items'),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        over(lens(prop('items'), assoc('itemsNftCollectionIds')), pipe(map(path(['nft', 'collection', 'id'])), uniq))
      ),
      when(
        has('targets'),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        over(lens(prop('targets'), assoc('targetsIds')), pipe(map(path(['collection', 'id'])), uniq))
      )
    )(modelObject) as Partial<ListingDocumentData>
  }
}
