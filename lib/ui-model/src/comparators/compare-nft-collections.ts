import { NftCollection } from '../types/nft-collection'

export function compareNftCollections(collectionA: NftCollection, collectionB: NftCollection) {
  return collectionA.name.localeCompare(collectionB.name)
}
