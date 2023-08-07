import { getNftsForOwner } from '@echo/alchemy'
import {
  addNft,
  findCollectionByAddress,
  findNftByCollection,
  getAllContractsAddresses,
  getUserWalletAddresses,
  updateNftOwner
} from '@echo/firebase-admin'
import { FirestoreNftPrototype, FirestoreUserData } from '@echo/firestore'
import { isNilOrEmpty } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { any, flatten, map, omit } from 'ramda'

// TODO This call is very slow, needs to be optimized, I suspect a major bottleneck when we'll have a lot of data
export const updateUserNfts = (user: FirestoreUserData) =>
  // Check if wallets are empty, fail fast
  isNilOrEmpty(user.wallets)
    ? Promise.resolve([])
    : getAllContractsAddresses().then((addressesResult) => {
        if (R.isError(addressesResult)) {
          return Promise.reject('Error fetching contract addresses')
        }
        return Promise.all(
          getUserWalletAddresses(user).map((address) =>
            getNftsForOwner({ owner: address, contractAddresses: R.getExn(addressesResult) })
          )
        ).then((nftResults) => {
          if (any(R.isError, nftResults)) {
            return Promise.reject('Error fetching NFTs from alchemy')
          }
          return Promise.all(
            flatten(map(R.getExn, nftResults)).map((nft) =>
              // TODO Should support multi chain, right now only ETH (chainId 1) is supported
              findNftByCollection({
                contract: { address: nft.contractAddress, chainId: 1 },
                tokenId: nft.tokenId as number
              })
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                .then((nftResult) => {
                  // NFT is not in DB, add it
                  if (R.isError(nftResult)) {
                    // TODO Should support multi chain, right now only ETH (chainId 1) is supported
                    return findCollectionByAddress({ address: nft.contractAddress, chainId: 1 }).then(
                      (collectionResult) => {
                        if (R.isError(collectionResult)) {
                          return Promise.reject('Could not find collection')
                        }
                        return addNft({
                          ...omit(['contractAddresses'], nft),
                          collectionId: R.getExn(collectionResult).id,
                          ownerId: user.id
                        } as unknown as FirestoreNftPrototype)
                      }
                    )
                  }
                  const nftData = R.getExn(nftResult)
                  return updateNftOwner(nftData.id, user.id)
                })
                .finally(() => ({}))
            )
          )
        })
      })
