import { getListingPostSnapshotById } from '@test-utils/listing-post/get-listing-post-snapshot-by-id'
import { type WriteResult } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export async function deleteListingPost(id: string): Promise<WriteResult> {
  const documentSnapshot = await getListingPostSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error(`listing post with id ${id} does not exist`)
  }
  return documentSnapshot.ref.delete()
}
