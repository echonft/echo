import { offerPostDocumentDataConverter } from '@echo/firestore/converters/offer-post/offer-post-document-data-converter'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { OfferPost } from '@echo/firestore/types/model/offer-post/offer-post'
import type { OfferPostDocumentData } from '@echo/firestore/types/model/offer-post/offer-post-document-data'
import type { FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { PartialWithFieldValue } from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const offerPostDataConverter: FirestoreDataConverter<OfferPost> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<OfferPostDocumentData>) {
    return pipe(getSnapshotData<OfferPostDocumentData>, offerPostDocumentDataConverter.fromFirestore)(snapshot)
  },
  toFirestore(modelObject: PartialWithFieldValue<OfferPost>) {
    return offerPostDocumentDataConverter.toFirestore(modelObject)
  }
}
