import { getNftsForContract } from '@echo/alchemy'
import { addNft } from '@echo/firebase-admin'
import { FirestoreNftCollectionData, FirestoreNftPrototype } from '@echo/firestore'
import { R } from '@mobily/ts-belt'
import { any, omit } from 'ramda'

export const populateNftCollection = (collection: FirestoreNftCollectionData, address: string) =>
  getNftsForContract(address).then((nftsResults) => {
    if (R.isError(nftsResults)) {
      return Promise.reject(Error('createAndPopulateNftCollection Error fetching NFTs'))
    }
    const nfts = R.getExn(nftsResults)
    return Promise.all(
      nfts.map((nft) =>
        addNft({
          ...omit(['contractAddresses'], nft),
          collectionId: collection.id
        } as unknown as FirestoreNftPrototype)
      )
    ).then((nftDataResults) => {
      if (any(R.isError, nftDataResults)) {
        return Promise.reject(Error('createAndPopulateNftCollection Error adding NFTs'))
      }
      return collection
    })
  })
