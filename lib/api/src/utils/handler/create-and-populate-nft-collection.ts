import { populateNftCollection } from './populate-nft-collection'
import { addNftCollection } from '@echo/firebase-admin'
import { FirestoreNftCollectionData, FirestoreNftCollectionPrototype } from '@echo/firestore'
import { R } from '@mobily/ts-belt'

// TODO: Remove NFT generation here, we won't use it that way
export const createAndPopulateNftCollection = (
  nftCollectionPrototype: FirestoreNftCollectionPrototype,
  address: string
): Promise<FirestoreNftCollectionData> =>
  addNftCollection(nftCollectionPrototype)
    .then((collection) => {
      return getNftsForContract(address)
        .then((nfts) => {
          return Promise.all(
            nfts.map((nft) =>
              addNft({
                ...omit(['contractAddresses'], nft),
                collectionId: collection.id
              } as unknown as FirestoreNftPrototype)
            )
          )
            .then((_nfts) => collection)
            .catch(() => Promise.reject('createAndPopulateNftCollection Error adding NFTs'))
        })
      return Promise.reject(Error('createAndPopulateNftCollection Error adding NFT Collection'))
    }
    return populateNftCollection(R.getExn(collectionDataResult), address)
  })
