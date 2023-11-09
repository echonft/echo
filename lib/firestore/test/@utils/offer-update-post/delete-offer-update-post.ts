import { getOfferUpdatePostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-update-posts-collection-reference'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert/assert-query-document-snapshot'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-snapshot'
import { WriteResult } from 'firebase-admin/firestore'

export async function deleteOfferUpdatePost(id: string): Promise<WriteResult> {
  const querySnapshot = await getOfferUpdatePostsCollectionReference().where('id', '==', id).get()
  const documentSnapshot = getQuerySnapshotDocumentSnapshot(querySnapshot)
  assertQueryDocumentSnapshot(documentSnapshot)
  return documentSnapshot.ref.delete()
}
