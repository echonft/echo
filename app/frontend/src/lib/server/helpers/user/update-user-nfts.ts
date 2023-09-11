import {
  addNft,
  findNftByCollectionContract,
  getAllNftCollections,
  getUserWalletAddresses,
  setNftOwner,
  setUserNftsUpdated
} from '@echo/firestore'
import { User, Wallet } from '@echo/firestore-types'
import { isNilOrEmpty } from '@echo/utils'
import { getNftsForOwner } from '@server/helpers/alchemy/get-nfts-for-owner'
import { mapAlchemyNftToFirestore } from '@server/helpers/alchemy/map-alchemy-nft-to-firestore'
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
      const nft = await findNftByCollectionContract(contractAddress, chainId, tokenId)
      if (isNil(nft)) {
        await addNft(mapAlchemyNftToFirestore(alchemyNft, user, userWallet, collections))
      } else {
        await setNftOwner(nft.id, user.id, userWallet)
      }
    }
  }
  await setUserNftsUpdated(user.id)
}
