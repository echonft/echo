import { getOfferPostSnapshotById } from '@test-utils/offer-post/get-offer-post-snapshot-by-id'

export async function findOfferPostById(id: string) {
  const documentSnapshot = await getOfferPostSnapshotById(id)
  return documentSnapshot?.data()
}
