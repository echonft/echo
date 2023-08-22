import { ApiError } from '../api-error'
import { getAllNftCollections } from '../nft-collection/get-all-nft-collections'
import { getNftCollectionByContract } from '../nft-collection/get-nft-collection-by-contract'
import { setUserUpdatedAt } from './set-user-updated-at'
import { getNftsForOwner } from '@echo/alchemy'
import {
  addNft,
  findNftByCollectionContract,
  getUserWalletAddresses,
  mapUserToUserDetails,
  Nft,
  setNftOwner,
  User,
  Wallet
} from '@echo/firestore'
import { isNilOrEmpty } from '@echo/utils'
import { isNil, map, omit, path } from 'ramda'

export const updateUserNfts = async (user: User) => {
  if (isNilOrEmpty(user.wallets)) {
    return
  }
  const collections = await getAllNftCollections()
  const addresses = map(path(['contract', 'address']), collections) as string[]
  // TODO Should support multi chain, right now only ETH (chainId 1) is supported
  const userWalletAddresses = getUserWalletAddresses(1)(user)
  try {
    await Promise.all(
      map(async (address) => {
        // TODO Should support multi chain, right now only ETH (chainId 1) is supported
        const userWallet: Wallet = { address, chainId: 1 }
        const nfts = await getNftsForOwner({ owner: address, contractAddresses: addresses })
        await Promise.all(
          map(async ({ contractAddress, chainId, tokenId }) => {
            const nft = await findNftByCollectionContract(contractAddress, chainId, tokenId)
            if (isNil(nft)) {
              const collection = getNftCollectionByContract(contractAddress, chainId, collections)!
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
      }, userWalletAddresses)
    )
  } catch (error) {
    throw new ApiError(500, 'Error updating user NFTs')
  }
  await setUserUpdatedAt(user)
}
