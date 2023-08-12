import { getNftsForOwner } from '@echo/alchemy'
import {
  addNft,
  findNftByCollection,
  findNftCollectionByAddress,
  FirestoreNftPrototype,
  FirestoreUserData,
  getAllContractsAddresses,
  getUserWalletAddresses,
  updateNftOwner
} from '@echo/firestore'
import { isNilOrEmpty } from '@echo/utils'
import { flatten, omit } from 'ramda'

// TODO This call is very slow, needs to be optimized, I suspect a major bottleneck when we'll have a lot of data
// I believe the culprit might be findNftByCollection as it seems to take 6-7s on cold start.
export const updateUserNfts = (user: FirestoreUserData) =>
  // Check if wallets are empty, fail fast
  isNilOrEmpty(user.wallets)
    ? Promise.resolve([])
    : getAllContractsAddresses()
        .then((addresses) => {
          return Promise.all(
            getUserWalletAddresses(user).map((address) =>
              getNftsForOwner({ owner: address, contractAddresses: addresses })
            )
          )
            .then((nfts) =>
              Promise.all(
                flatten(nfts).map((nft) =>
                  // TODO Should support multi chain, right now only ETH (chainId 1) is supported
                  findNftByCollection({
                    contract: { address: nft.contractAddress, chainId: 1 },
                    tokenId: nft.tokenId as number
                  })
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    .then((nft) => updateNftOwner(nft.id, user.id))
                    .catch(() =>
                      // NFT is not in DB, add it
                      // TODO Should support multi chain, right now only ETH (chainId 1) is supported
                      findNftCollectionByAddress({ address: nft.contractAddress, chainId: 1 }).then((collection) =>
                        addNft({
                          ...omit(['contractAddress'], nft),
                          collectionId: collection.id,
                          ownerId: user.id
                        } as unknown as FirestoreNftPrototype)
                      )
                    )
                    .catch(() => Promise.reject('Could not find collection'))
                )
              )
            )
            .catch(() => Promise.reject('Error fetching NFTs from alchemy'))
        })
        .catch(() => Promise.reject('Error fetching contract addresses'))
