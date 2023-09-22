import { listingPostDocumentDataConverter } from '@echo/firestore/converters/listing-post/listing-post-document-data-converter'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { FirestoreModel } from '@echo/firestore/types/abstract/firestore-model'
import type { FirestoreListingPost } from '@echo/firestore/types/model/listing-post/firestore-listing-post'
import type { ListingPostDocumentData } from '@echo/firestore/types/model/listing-post/listing-post-document-data'
import type { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const listingPostDataConverter: FirestoreDataConverter<Partial<FirestoreListingPost>> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<ListingPostDocumentData>) {
    return pipe(getSnapshotData<ListingPostDocumentData>, listingPostDocumentDataConverter.fromFirestore)(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<FirestoreListingPost>, _options?: SetOptions): ListingPostDocumentData {
    return listingPostDocumentDataConverter.toFirestore(modelObject)
  }
}
