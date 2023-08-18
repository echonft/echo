import { getNftCollectionSnapshotBySlug } from './get-nft-collection-snapshot-by-slug'

export const findNftCollectionBySlug = async (slug: string) => {
  const documentSnapshot = await getNftCollectionSnapshotBySlug(slug)
  return documentSnapshot.data()
}
