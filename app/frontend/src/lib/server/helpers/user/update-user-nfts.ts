import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { findNftByCollectionContract } from '@echo/firestore/crud/nft/find-nft-by-collection-contract'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { getAllNftCollections } from '@echo/firestore/crud/nft-collection/get-all-nft-collections'
import { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { Wallet } from '@echo/model/types/wallet'
import { getNftsForOwner } from '@server/helpers/alchemy/get-nfts-for-owner'
import { mapAlchemyNftToFirestore } from '@server/helpers/alchemy/map-alchemy-nft-to-firestore'
import { filter, find, isNil, map, path, pathEq } from 'ramda'

export async function updateUserNfts(user: UserDocumentData, wallet: Wallet) {
  const collections = await getAllNftCollections()
  const collectionsForChain = filter(pathEq(wallet.chainId, ['contract', 'chainId']), collections)
  const collectionsAddresses = map(path<string>(['contract', 'address']), collectionsForChain) as string[]
  const nfts = await getNftsForOwner(wallet.address, collectionsAddresses, wallet.chainId)
  for (const alchemyNft of nfts) {
    const { contractAddress, chainId, tokenId } = alchemyNft
    // FIXME this is true only for ERC721
    const nft = await findNftByCollectionContract(contractAddress, chainId, tokenId)
    if (isNil(nft)) {
      const collection = find(pathEq(contractAddress, ['contract', 'address']), collectionsForChain)
      if (!isNil(collection)) {
        const nft = mapAlchemyNftToFirestore(alchemyNft, user, wallet, collection)
        await addNft(nft)
      }
    } else {
      await setNftOwner(nft.id, user, wallet)
    }
  }
}
