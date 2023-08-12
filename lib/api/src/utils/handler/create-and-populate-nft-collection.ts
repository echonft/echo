import { populateNftCollection } from './populate-nft-collection'
import { addNftCollection, FirestoreNftCollectionData, FirestoreNftCollectionPrototype } from '@echo/firestore'

// TODO: Remove NFT generation here, we won't use it that way
export const createAndPopulateNftCollection = (
  nftCollectionPrototype: FirestoreNftCollectionPrototype,
  address: string
): Promise<FirestoreNftCollectionData> =>
  addNftCollection(nftCollectionPrototype)
    .then((collection) => populateNftCollection(collection, address))
    .catch(() => Promise.reject('createAndPopulateNftCollection Error adding NFT Collection'))
