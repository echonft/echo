import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { findNftByCollectionContract } from '@echo/firestore/crud/nft/find-nft-by-collection-contract'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { getAllNftCollections } from '@echo/firestore/crud/nft-collection/get-all-nft-collections'
import { setUserUpdated } from '@echo/firestore/crud/user/set-user-updated'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import type { FirestoreDiscordUser } from '@echo/firestore/types/model/firestore-discord-user'
import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
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
  wallets: FirestoreWallet[]
}

export async function updateUserNfts(user: Partial<FirestoreDiscordUser> & RequiredUserProps) {
  // TODO adjust when we support more chains
  const userWalletAddresses = getWalletsForUser(user.id)
  if (isNilOrEmpty(userWalletAddresses)) {
    return
  }
  const collections = await getAllNftCollections()
  const addresses = map(path(['contract', 'address']), collections) as string[]
  // TODO Should support multi chain, right now only ETH (chainId 1) is supported
  for (const address of userWalletAddresses) {
    // TODO Should support multi chain, right now only ETH (chainId 1) is supported
    const userWallet: FirestoreWallet = { address, chainId: 1 }
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
  await setUserUpdated(user.id)
}
