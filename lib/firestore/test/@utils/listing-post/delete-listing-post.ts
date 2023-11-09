import { getListingPostSnapshotById } from '@echo/firestore-test/listing-post/get-listing-post-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export async function deleteListingPost(id: string): Promise<WriteResult> {
  const documentSnapshot = await getListingPostSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error(`listing post with id ${id} does not exist`)
  }
  return documentSnapshot.ref.delete()
}
