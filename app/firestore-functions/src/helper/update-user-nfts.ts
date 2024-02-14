import { getNftsForOwner } from '@echo/alchemy/services/get-nfts-for-owner'
import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { findNftByCollection } from '@echo/firestore/crud/nft/find-nft-by-collection'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { Nullable } from '@echo/utils/types/nullable'
import { converge, filter, isNil, path, pathEq, prop } from 'ramda'

export async function updateUserNfts(userId: string) {
  const user = await findUserById(userId)
  if (!isNil(user)) {
    const wallets = await getWalletsForUser(user.username)
    const collections = await getAllCollections()
    for (const wallet of wallets) {
      const owner: User = getUserFromFirestoreData(user, wallet)
      const collectionsForChain = filter(pathEq(wallet.chainId, ['contract', 'chainId']), collections)
      const nfts = await getNftsForOwner(collectionsForChain, owner)
      for (const nft of nfts) {
        // FIXME this is true only for ERC721
        const existingNft = await converge<
          Promise<Nullable<Nft>>,
          [(nft: Omit<Nft, 'id' | 'updatedAt'>) => string, (nft: Omit<Nft, 'id' | 'updatedAt'>) => number]
        >(findNftByCollection, [nonNullableReturn(path(['collection', 'id'])), prop('tokenId')])(nft)
        if (isNil(existingNft)) {
          await addNft(nft)
        } else {
          await setNftOwner(existingNft.id, owner)
        }
      }
    }
  }
}
