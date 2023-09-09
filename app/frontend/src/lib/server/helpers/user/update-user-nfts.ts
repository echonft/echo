import { getNftsForOwner } from '../alchemy/get-nfts-for-owner'
import { createNft } from '../nft/create-nft'
import { getNftByCollectionContract } from '../nft/get-nft-by-collection-contract'
import { updateNftOwner } from '../nft/update-nft-owner'
import { getAllNftCollections } from '../nft-collection/get-all-nft-collections'
import { getUserWalletAddresses } from './get-user-wallet-addresses'
import { setUserNftsUpdated } from './set-user-nfts-updated'
import { User, Wallet } from '@echo/firestore-types'
import { isNilOrEmpty } from '@echo/utils'
import { isNil, map, path } from 'ramda'

interface RequiredUserProps {
  id: string
  discordAvatar?: string
  discordBanner?: string
  discordId: string
  discordUsername: string
  username: string
  wallets: Wallet[]
}

export async function updateUserNfts(user: Partial<User> & RequiredUserProps) {
  // TODO adjust when we support more chains
  const userWalletAddresses = getUserWalletAddresses(1, user as User)
  if (isNilOrEmpty(userWalletAddresses)) {
    return
  }
  const collections = await getAllNftCollections()
  const addresses = map(path(['contract', 'address']), collections) as string[]
  // TODO Should support multi chain, right now only ETH (chainId 1) is supported
  for (const address of userWalletAddresses) {
    // TODO Should support multi chain, right now only ETH (chainId 1) is supported
    const userWallet: Wallet = { address, chainId: 1 }
    const nfts = await getNftsForOwner(address, addresses)
    for (const alchemyNft of nfts) {
      const { contractAddress, chainId, tokenId } = alchemyNft
      // FIXME this is true only for ERC721
      const nft = await getNftByCollectionContract(contractAddress, chainId, tokenId)
      if (isNil(nft)) {
        await createNft(alchemyNft, user as User, userWallet, collections)
      } else {
        await updateNftOwner(nft.id, user.id, userWallet)
      }
    }
  }
  await setUserNftsUpdated(user.id)
}
