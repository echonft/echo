import { NftCollection } from '../../types/nft-collection'

export const compareNftCollections = (collectionA: NftCollection, collectionB: NftCollection) =>
  collectionA.name.localeCompare(collectionB.name)
