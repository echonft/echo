import { assocExpiredProp } from '@echo/firestore/helpers/converters/from-firestore/assoc-expired-prop'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import { type ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { type Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import type { ListingTarget } from '@echo/model/types/listing-target'
import {
  type FirestoreDataConverter,
  type PartialWithFieldValue,
  QueryDocumentSnapshot
} from 'firebase-admin/firestore'
import {
  assoc,
  dissoc,
  has,
  lens,
  map,
  modify,
  modifyPath,
  over,
  partial,
  path,
  pipe,
  prop,
  toLower,
  uniq,
  when
} from 'ramda'

function modifyItems(listing: Listing): Listing {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return modify<'items', ListingItem[], ListingItem[]>(
    'items',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    map<ListingItem, ListingItem>(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pipe(
        partial(modifyPath, [['nft', 'owner', 'wallet', 'address'], toLower]),
        partial(modifyPath, [['nft', 'collection', 'contract', 'address'], toLower])
      )
    )
  )(listing) as Listing
}
function modifyTargets(listing: Listing): Listing {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return modify<'targets', ListingTarget[], ListingTarget[]>(
    'targets',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    map<ListingTarget, ListingTarget>(partial(modifyPath, [['collection', 'contract', 'address'], toLower]))
  )(listing) as Listing
}
function modifyCreator(listing: Listing): Listing {
  return partial(modifyPath, [['creator', 'wallet', 'address'], toLower])(listing) as Listing
}

export const listingDataConverter: FirestoreDataConverter<Listing> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<ListingDocumentData>) {
    return pipe(
      getSnapshotData<ListingDocumentData>,
      assocExpiredProp,
      dissoc('itemsNftIds'),
      dissoc('itemsNftCollectionIds'),
      dissoc('targetsIds'),
      modifyCreator,
      modifyItems,
      modifyTargets
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
        pipe(
          modify<'items', ListingItem[], ListingItem[]>(
            'items',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            map<ListingItem, ListingItem>(partial(modifyPath, [['nft', 'collection', 'contract', 'address'], toLower]))
          ),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          over(lens(prop('items'), assoc('itemsNftCollectionIds')), pipe(map(path(['nft', 'collection', 'id'])), uniq))
        )
      ),
      when(
        has('targets'),
        pipe(
          modify<'targets', ListingTarget[], ListingTarget[]>(
            'targets',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            map<ListingTarget, ListingTarget>(partial(modifyPath, [['collection', 'contract', 'address'], toLower]))
          ),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          over(lens(prop('targets'), assoc('targetsIds')), pipe(map(path(['collection', 'id'])), uniq))
        )
      ),
      when(has('creator'), modifyCreator)
    )(modelObject) as Partial<ListingDocumentData>
  }
}
