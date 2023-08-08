import { getNftsForContract } from '@echo/alchemy'
import { addNft } from '@echo/firebase-admin'
import { FirestoreNftCollectionData, FirestoreNftPrototype } from '@echo/firestore'
import { omit } from 'ramda'

export const populateNftCollection = (collection: FirestoreNftCollectionData, address: string) =>
  getNftsForContract(address)
    .then((nfts) => {
      return Promise.all(
        nfts.map((nft) =>
          addNft({
            ...omit(['contractAddresses'], nft),
            collectionId: collection.id
          } as unknown as FirestoreNftPrototype)
        )
      )
        .then(() => collection)
        .catch(() => Promise.reject('createAndPopulateNftCollection Error adding NFTs'))
    })
    .catch(() => Promise.reject('createAndPopulateNftCollection Error fetching NFTs'))
