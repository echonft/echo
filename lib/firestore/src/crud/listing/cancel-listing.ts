import { getListingSnapshotById } from '@echo/firestore/crud/listing/get-listing-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert-query-document-snapshot'
import { assertListingIsNotExpired } from '@echo/firestore/helpers/listing/assert/assert-listing-is-not-expired'
import { assertListingStateIs } from '@echo/firestore/helpers/listing/assert/assert-listing-state-is'
import dayjs from 'dayjs'
import type { WriteResult } from 'firebase-admin/lib/firestore'

export async function cancelListing(id: string): Promise<WriteResult> {
  const documentSnapshot = await getListingSnapshotById(id)
  assertQueryDocumentSnapshot(documentSnapshot)
  assertListingIsNotExpired(documentSnapshot.data())
  assertListingStateIs(documentSnapshot.data(), 'OPEN')
  return documentSnapshot.ref.update({ state: 'CANCELLED', updatedAt: dayjs().unix() })
}
