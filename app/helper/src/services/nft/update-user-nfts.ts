import { getNftsForOwner } from '@echo/alchemy/services/get-nfts-for-owner'
import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { findNftByCollection } from '@echo/firestore/crud/nft/find-nft-by-collection'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import type { Nullable } from '@echo/utils/types/nullable'
import { filter, isNil, pathEq, pick, pipe } from 'ramda'

export async function updateUserNfts(user: UserDocumentData) {
  const wallets = await getWalletsForUser(user.username)
  const collections = await getAllCollections()
  for (const wallet of wallets) {
    const owner: User = getUserFromFirestoreData(user, wallet)
    const collectionsForChain = filter(pathEq(wallet.chainId, ['contract', 'chainId']), collections)
    const nfts = await getNftsForOwner(collectionsForChain, owner)
    for (const nft of nfts) {
      // FIXME this is true only for ERC721
      const existingNft = await pipe<
        [Omit<Nft, 'id' | 'updatedAt'>],
        Pick<Omit<Nft, 'id' | 'updatedAt'>, 'collection' | 'tokenId'>,
        Promise<Nullable<Nft>>
      >(
        pick(['collection', 'tokenId']),
        findNftByCollection
      )(nft)
      if (isNil(existingNft)) {
        await addNft(nft)
      } else {
        await setNftOwner(existingNft.id, owner)
      }
    }
  }
}
