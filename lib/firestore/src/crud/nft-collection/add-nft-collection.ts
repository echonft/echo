import { getNftCollectionsCollection } from '@echo/firestore/helpers/collection/get-nft-collections-collection'
import type { Collection } from '@echo/model/types/collection'

export async function addNftCollection(nftCollection: Omit<Collection, 'id'>) {
  const reference = getNftCollectionsCollection().doc()
  const id = reference.id
  const newNftCollection = { ...nftCollection, id } as Collection
  await reference.set(newNftCollection)
  return newNftCollection
}
