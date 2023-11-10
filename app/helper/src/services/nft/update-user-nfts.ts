import { mapAlchemyNftToNft } from '@echo/alchemy/mappers/map-alchemy-nft-to-nft'
import { getNftsForOwner } from '@echo/alchemy/services/get-nfts-for-owner'
import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { findNftByCollectionContract } from '@echo/firestore/crud/nft/find-nft-by-collection-contract'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import type { User } from '@echo/model/types/user'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { HexString } from '@echo/utils/types/hex-string'
import { filter, find, isNil, map, path, pathEq } from 'ramda'

export async function updateUserNfts(user: User) {
  const collections = await getAllCollections()
  const collectionsForChain = filter(pathEq(user.wallet.chainId, ['contract', 'chainId']), collections)
  const collectionsAddresses = map(nonNullableReturn(path<HexString>(['contract', 'address'])), collectionsForChain)
  const nfts = await getNftsForOwner(user.wallet.address, collectionsAddresses, user.wallet.chainId)
  for (const alchemyNft of nfts) {
    const { contractAddress, chainId, tokenId } = alchemyNft
    // FIXME this is true only for ERC721
    const nft = await findNftByCollectionContract(contractAddress, chainId, tokenId)
    if (isNil(nft)) {
      const collection = find(pathEq(contractAddress, ['contract', 'address']), collectionsForChain)
      if (!isNil(collection)) {
        const nft = mapAlchemyNftToNft(alchemyNft, user, collection)
        await addNft(nft)
      }
    } else {
      await setNftOwner(nft.id, user)
    }
  }
}
