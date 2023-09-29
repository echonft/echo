import { listingDocumentDataConverter } from '@echo/firestore/converters/listing/listing-document-data-converter'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import type { FirestoreDataConverter, PartialWithFieldValue, QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const listingDataConverter: FirestoreDataConverter<FirestoreListing> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<ListingDocumentData>) {
    return pipe(getSnapshotData<ListingDocumentData>, listingDocumentDataConverter.fromFirestore)(snapshot)
  },
  toFirestore(modelObject: PartialWithFieldValue<FirestoreListing>): ListingDocumentData {
    return listingDocumentDataConverter.toFirestore(modelObject)
  }
}
