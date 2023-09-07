import { getNftCollectionSnapshotBySlug } from './get-nft-collection-snapshot-by-slug'

export async function findNftCollectionBySlug(slug: string) {
  const documentSnapshot = await getNftCollectionSnapshotBySlug(slug)
  return documentSnapshot?.data()
}
