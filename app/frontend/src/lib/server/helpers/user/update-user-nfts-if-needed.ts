import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { findNftByCollectionContract } from '@echo/firestore/crud/nft/find-nft-by-collection-contract'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { getAllNftCollections } from '@echo/firestore/crud/nft-collection/get-all-nft-collections'
import { setUserUpdated } from '@echo/firestore/crud/user/set-user-updated'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/firestore-nft-collection'
import { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { USER_NFTS_VALIDITY_TIME } from '@server/constants/user-nfts-validity-time'
import { getNftsForOwner } from '@server/helpers/alchemy/get-nfts-for-owner'
import { mapAlchemyNftToFirestore } from '@server/helpers/alchemy/map-alchemy-nft-to-firestore'
import dayjs from 'dayjs'
import { filter, find, isNil, map, path, pathEq, propEq } from 'ramda'

export async function updateUserNftsIfNeeded(user: FirestoreUser, chainId: number) {
  if (isNil(user.updatedAt) || user.updatedAt.add(USER_NFTS_VALIDITY_TIME, 'minute').isBefore(dayjs())) {
    const userWallets = await getWalletsForUser(user.id)
    const userWalletsForChain = filter(propEq(chainId, 'chainId'), userWallets)
    if (isNilOrEmpty(userWalletsForChain)) {
      return
    }
    const collections = await getAllNftCollections()
    const collectionsForChain = filter(pathEq(chainId, ['contract', 'chainId']), collections)
    const collectionsAddresses = map(path<string>(['contract', 'address']), collectionsForChain) as string[]
    for (const wallet of userWallets) {
      const nfts = await getNftsForOwner(wallet.address, collectionsAddresses)
      for (const alchemyNft of nfts) {
        const { contractAddress, chainId, tokenId } = alchemyNft
        // FIXME this is true only for ERC721
        const nft = await findNftByCollectionContract(contractAddress, chainId, tokenId)
        if (isNil(nft)) {
          const collection = find(
            pathEq(contractAddress, ['contract', 'address']),
            collectionsForChain
          ) as FirestoreNftCollection
          const nft = await mapAlchemyNftToFirestore(alchemyNft, user, wallet, collection)
          await addNft(nft)
        } else {
          await setNftOwner(nft.id, user.id, user.name, wallet)
        }
      }
    }
    await setUserUpdated(user.id)
  }
}
