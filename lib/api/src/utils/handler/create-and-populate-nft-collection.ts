import { populateNftCollection } from './populate-nft-collection'
import { addNftCollection } from '@echo/firebase-admin'
import { FirestoreNftCollectionData, FirestoreNftCollectionPrototype } from '@echo/firestore'
import { R } from '@mobily/ts-belt'

// TODO: Remove NFT generation here, we won't use it that way
export const createAndPopulateNftCollection = (
  nftCollectionPrototype: FirestoreNftCollectionPrototype,
  address: string
): Promise<FirestoreNftCollectionData> =>
  addNftCollection(nftCollectionPrototype).then((collectionDataResult) => {
    if (R.isError(collectionDataResult)) {
      return Promise.reject(Error('createAndPopulateNftCollection Error adding NFT Collection'))
    }
    return populateNftCollection(R.getExn(collectionDataResult), address)
  })
