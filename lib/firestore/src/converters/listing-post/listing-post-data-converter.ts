import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { FirestoreListingPost } from '@echo/firestore/types/model/listing-post/firestore-listing-post'
import type { ListingPostDocumentData } from '@echo/firestore/types/model/listing-post/listing-post-document-data'
import { modifyDatePropToNumber } from '@echo/utils/fp/modify-date-prop-to-number'
import { modifyNumberPropToDate } from '@echo/utils/fp/modify-number-prop-to-date'
import type { FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { PartialWithFieldValue } from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const listingPostDataConverter: FirestoreDataConverter<FirestoreListingPost> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<ListingPostDocumentData>) {
    return pipe(getSnapshotData<ListingPostDocumentData>, modifyNumberPropToDate('postedAt'))(snapshot)
  },
  toFirestore(modelObject: PartialWithFieldValue<FirestoreListingPost>) {
    return modifyDatePropToNumber<'postedAt', PartialWithFieldValue<FirestoreListingPost>>('postedAt')(
      modelObject
    ) as Partial<ListingPostDocumentData>
  }
}
