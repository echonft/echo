import { getOfferPostSnapshotById } from '@echo/firestore/crud/offer-post/get-offer-post-snapshot-by-id'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export async function deleteOfferPost(id: string): Promise<WriteResult> {
  const documentSnapshot = await getOfferPostSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error(`offer post with id ${id} does not exist`)
  }
  return documentSnapshot.ref.delete()
}
