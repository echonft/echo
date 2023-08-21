import { findNftCollectionByContract } from '../nft-collection/find-nft-collection-by-contract'
import { getNftsForOwner } from '@echo/alchemy'
import {
  addNft,
  findNftByCollectionContract,
  getAllNftCollections,
  getUserWalletAddresses,
  mapUserToUserDetails,
  Nft,
  setNftOwner,
  User,
  Wallet
} from '@echo/firestore'
import { isNilOrEmpty } from '@echo/utils'
import { isNil, map, omit, path } from 'ramda'

// TODO This call is very slow, needs to be optimized, I suspect a major bottleneck when we'll have a lot of data
// I believe the culprit might be findNftByCollection as it seems to take 6-7s on cold start.
export const updateUserNfts = async (user: User) => {
  // Check if wallets are empty, fail fast
  if (isNilOrEmpty(user.wallets)) {
    return Promise.resolve([])
  }
  try {
    const collections = await getAllNftCollections()
    const addresses = map(path(['contract', 'address']), collections) as string[]
    // TODO Should support multi chain, right now only ETH (chainId 1) is supported
    const userWalletAddresses = getUserWalletAddresses(1)(user)
    await Promise.all(
      map(async (address) => {
        try {
          const nfts = await getNftsForOwner({ owner: address, contractAddresses: addresses })
          await Promise.all(
            map(async ({ contractAddress, chainId, tokenId }) => {
              const nft = await findNftByCollectionContract(contractAddress, chainId, tokenId)
              const userWallet: Wallet = { address, chainId }
              if (isNil(nft)) {
                const collection = findNftCollectionByContract(contractAddress, chainId, collections)!
                const firestoreNft = {
                  ...omit(['contractAddress', 'chainId'], nft),
                  collection,
                  owner: mapUserToUserDetails(user, userWallet)
                } as Nft
                await addNft(firestoreNft)
              } else {
                await setNftOwner(nft.id, user.id, userWallet)
              }
            }, nfts)
          )
        } catch (error) {
          return Promise.reject('Error fetching NFTs from alchemy')
        }
      }, userWalletAddresses)
    )
    return
  } catch (error) {
    return Promise.reject('Error fetching collections')
  }
}
