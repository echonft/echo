import { createNft } from '../nft/create-nft'
import { getAllNftCollections } from '../nft-collection/get-all-nft-collections'
import { setUserUpdatedAt } from './set-user-updated-at'
import { getNftsForOwner } from '@echo/alchemy'
import { findNftByCollectionContract, getUserWalletAddresses, setNftOwner, User, Wallet } from '@echo/firestore'
import { isNilOrEmpty } from '@echo/utils'
import { isNil, map, path } from 'ramda'

export const updateUserNfts = async (user: User) => {
  if (isNilOrEmpty(user.wallets)) {
    return
  }
  const collections = await getAllNftCollections()
  const addresses = map(path(['contract', 'address']), collections) as string[]
  // TODO Should support multi chain, right now only ETH (chainId 1) is supported
  const userWalletAddresses = getUserWalletAddresses(1)(user)
  for (const address of userWalletAddresses) {
    // TODO Should support multi chain, right now only ETH (chainId 1) is supported
    const userWallet: Wallet = { address, chainId: 1 }
    const nfts = await getNftsForOwner({ owner: address, contractAddresses: addresses })
    for (const alchemyNft of nfts) {
      const { contractAddress, chainId, tokenId } = alchemyNft
      const nft = await findNftByCollectionContract(contractAddress, chainId, tokenId)
      if (isNil(nft)) {
        await createNft(alchemyNft, user, userWallet, collections)
      } else {
        await setNftOwner(nft.id, user.id, userWallet)
      }
    }
  }
  await setUserUpdatedAt(user)
}
