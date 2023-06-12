import { getNftsForContract } from '@echo/alchemy-v3'
import { addNft, addNftCollection } from '@echo/firebase-admin'
import { FirestoreNftCollectionData, FirestoreNftCollectionPrototype, FirestoreNftPrototype } from '@echo/firestore'
import { R } from '@mobily/ts-belt'
import { any, omit } from 'ramda'

export const createAndPopulateNftCollection = (
  nftCollectionPrototype: FirestoreNftCollectionPrototype,
  address: string
): Promise<FirestoreNftCollectionData> => {
  return addNftCollection(nftCollectionPrototype).then((collectionDataResult) => {
    if (R.isError(collectionDataResult)) {
      throw new Error('createAndPopulateNftCollection Error adding NFT Collection')
    }
    return getNftsForContract(address).then((nftsResults) => {
      if (R.isError(nftsResults)) {
        throw new Error('createAndPopulateNftCollection Error fetching NFTs')
      }
      const nfts = R.getExn(nftsResults)
      const collection = R.getExn(collectionDataResult)
      return Promise.all(
        nfts.map((nft) =>
          addNft({
            ...omit(['contractAddresses'], nft),
            collectionId: collection.id
          } as unknown as FirestoreNftPrototype)
        )
      ).then((nftDataResults) => {
        if (any(R.isError, nftDataResults)) {
          throw new Error('createAndPopulateNftCollection Error adding NFTs')
        }
        return collection
      })
    })
  })
}
